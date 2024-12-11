import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ColorPicker, Button } from 'antd';
import '../css/BoxShadowPreview.css';

const BoxShadowPreview = ({ generateBoxShadow }) => {
  const [boxColor, setBoxColor] = useState('#1890ff');
  const [containerColor, setContainerColor] = useState('#ffffff');

  return (
    <div className="preview-container">
      <div className="header-preview">
        <span className="preview-box-text">Preview</span>
        <div className="color-pickers">
          <ColorPicker
            value={containerColor}
            onChange={(color) => {
              const rgbaColor = color.toRgbString();
              setContainerColor(rgbaColor);
            }}
          >
            <div className="color-picker-button-container-preview"> 
              <Button type="primary" className="color-picker-button-preview"
                style={{ backgroundColor: containerColor, 
                color: '#fff', 
                borderColor: containerColor }} >
              </Button> 
            </div>
          </ColorPicker>
          <ColorPicker
            value={boxColor}
            onChange={(color) => {
              const rgbaColor = color.toRgbString();
              setBoxColor(rgbaColor);
            }}
          >
            <div className="color-picker-button-container-preview"> 
              <Button type="primary" className="color-picker-button-preview"
                style={{ backgroundColor: boxColor, 
                color: '#fff', 
                borderColor: boxColor }} >
              </Button> 
            </div>
          </ColorPicker>
        </div>
      </div>
      <div className="container-box" style={{ backgroundColor: containerColor }}>
        <div
          style={{
            resize: "both",
            overflow: "auto",
            width: "200px",
            height: "200px",
            minWidth: "100px", 
            minHeight: "100px",
            maxWidth: "300px",
            maxHeight: "300px",
            boxShadow: generateBoxShadow(),
            backgroundColor: boxColor,
          }}
        />
      </div>
    </div>
  );
};

export default BoxShadowPreview;
