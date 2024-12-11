import { h } from 'preact';
import { List, Button, Divider, Slider, Checkbox, ColorPicker, Row, Col } from 'antd';
import { MdDelete, MdModeEdit } from "react-icons/md";
import { TiThList } from "react-icons/ti";
import { useBoxShadowStore, updateState, addBoxShadow, selectBoxShadow, deleteBoxShadow, moveLayer } from '../store/store.jsx';
import BoxShadowCssCode from './BoxShadowCssCode';
import BoxShadowPreview from './BoxShadowPreview';
import BoxShadowTemplate from './BoxShadowTemplate.jsx';
import '../css/BoxShadowGenerator.css';

const BoxShadowGenerator = () => {
  const [state, setState] = useBoxShadowStore();

  const generateBoxShadow = () => {
    return state.boxShadows
      .map(({ horizontal, vertical, blur, spread, opacity, color, inset }) => {
        const insetText = inset ? ' inset' : '';
        return `rgba(${color},${opacity}) ${horizontal}px ${vertical}px ${blur}px ${spread}px${insetText}`;
      })
      .join(',');
  };

  const handleDelete = (index) => {
    selectBoxShadow(setState, index);
    deleteBoxShadow(setState, index);
  };

  return (
    <Row>
      <Col xs={24} md={12} lg={12}>
        <div className="container_generator">
          <h1>Box-Shadow CSS Generator</h1>
          <div className="control-item">
            {state.selectedIndex !== null && (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Shift right:</label>
                  <Slider
                    min={-50}
                    max={50}
                    value={state.boxShadows[state.selectedIndex].horizontal}
                    onChange={(value) => updateState(setState, state.selectedIndex, 'horizontal', value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label>Shift down:</label>
                  <Slider
                    min={-50}
                    max={50}
                    value={state.boxShadows[state.selectedIndex].vertical}
                    onChange={(value) => updateState(setState, state.selectedIndex, 'vertical', value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label>Spread:</label>
                  <Slider
                    min={0}
                    max={100}
                    value={state.boxShadows[state.selectedIndex].spread}
                    onChange={(value) => updateState(setState, state.selectedIndex, 'spread', value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label>Blur:</label>
                  <Slider
                    min={0}
                    max={100}
                    value={state.boxShadows[state.selectedIndex].blur}
                    onChange={(value) => updateState(setState, state.selectedIndex, 'blur', value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label>Opacity:</label>
                  <Slider
                    min={1}
                    max={100}
                    step={1}
                    value={(state.boxShadows[state.selectedIndex].opacity)*100}
                    onChange={(value) => updateState(setState, state.selectedIndex, 'opacity', value/100)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Checkbox
                    checked={state.boxShadows[state.selectedIndex].inset}
                    onChange={(e) => updateState(setState, state.selectedIndex, 'inset', e.target.checked)}
                  >
                  </Checkbox>
                  <label style={{ marginLeft: '6px' }}>Inset</label>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <ColorPicker
                    value={`rgb(${state.boxShadows[state.selectedIndex].color})`
                    }
                    onChange={(color) => {
                      console.log(color.toRgb());
                      const { r, g, b } = color.toRgb();
                      const rgbColor = `${r},${g},${b}`;
                      updateState(setState, state.selectedIndex, 'color', rgbColor);
                    }}
                  >
                    <div className="color-picker-button-container-generator"> 
                      <Button type="primary" className="color-picker-button-generator"
                        style={{ backgroundColor: `rgb(${state.boxShadows[state.selectedIndex].color})`, 
                        color: '#fff', 
                        borderColor: `rgb(${state.boxShadows[state.selectedIndex].color})`, }} >
                      </Button> 
                    </div>
                  </ColorPicker>
              </div>
            </div>
          )}
          
          <Divider />
          <Button className='addlayer' onClick={() => addBoxShadow(setState)}>Add Layer</Button>
          <List
            dataSource={state.boxShadows}
            renderItem={(boxShadow, index) => (
              <List.Item
                key={index}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('draggedIndex', index.toString());
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const draggedIndex = parseInt(e.dataTransfer.getData('draggedIndex'), 10);
                  moveLayer(setState, draggedIndex, index);
                }}
              >
                <div
                  className={`list-item ${state.selectedIndex === index ? 'selected-item' : ''}`}
                  onClick={() => selectBoxShadow(setState, index)}
                >
                    <TiThList />
                  <span className="box-shadow-info">
                   {boxShadow.horizontal}px {boxShadow.vertical}px {boxShadow.blur}px {boxShadow.spread}px rgba({boxShadow.color},{boxShadow.opacity}){boxShadow.inset ? ' inset' : ''}
                  </span>
                  <div className="editicon">
                    <MdModeEdit />
                  </div>
                  <Button
                    className="delete-btn"
                    type="link"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
        </div>
      </Col>

      <Col xs={24} md={12} lg={12}>
        <div className="right-container">
          <BoxShadowPreview generateBoxShadow={generateBoxShadow} />
          <BoxShadowCssCode generateBoxShadow={generateBoxShadow} />
          <BoxShadowTemplate/>
        </div>
      </Col>
    </Row>
  );
};

export default BoxShadowGenerator;
