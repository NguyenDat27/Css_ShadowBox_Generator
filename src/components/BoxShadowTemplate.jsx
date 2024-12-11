import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useBoxShadowStore, applyTemplate } from '../store/store.jsx';
import '../css/BoxShadowTemplate.css';
import { boxShadowTemplate1, boxShadowTemplate2, boxShadowTemplate3, boxShadowTemplate4 } from './../store/template';

const template1 = "rgba(40,159,237,1) 5px 5px 0px 0px,rgba(95,184,255,1) 10px 10px 0px 0px,rgba(161,216,255,1) 15px 15px 0px 0px,rgba(202,230,255,1) 20px 20px 0px 0px,rgba(225,238,255,1) 25px 25px 0px 0px";
const template2 = "rgba(255,255,255,1) -1px 0px 4px 0px,rgba(255,255,0,1) -2px 0px 10px 0px,rgba(255,128,0,1) -10px 0px 20px 0px,rgba(255,0,0,1) -18px 0px 40px 0px";

const BoxShadowTemplate = () => {
  const [state, setState] = useBoxShadowStore();
  
  const [stateTemplate1, setStateTemplate1] = useState(boxShadowTemplate1);
  const [stateTemplate2, setStateTemplate2] = useState(boxShadowTemplate3);

  const handleTemplateClick = (templateType) => {
    if (templateType === 'template1') {
      const newTemplate = stateTemplate1 === boxShadowTemplate1 ? boxShadowTemplate2 : boxShadowTemplate1;
      setStateTemplate1(newTemplate); 
      applyTemplate(setState, newTemplate); 
    } else if (templateType === 'template2') {
      const newTemplate = stateTemplate2 === boxShadowTemplate3 ? boxShadowTemplate4 : boxShadowTemplate3;
      setStateTemplate2(newTemplate);
      applyTemplate(setState, newTemplate); 
    }
  };

  return (
    <div className="template-container">
      <h2>Template</h2>
      <div className="option">
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#7DD8EA",
            boxShadow: template1,
          }}
          onClick={() => handleTemplateClick('template1')}
        />
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#7DD8EA",
            boxShadow: template2,
            transform: "rotate(90deg)",
          }}
          onClick={() => handleTemplateClick('template2')}
        />
      </div>
    </div>
  );
};

export default BoxShadowTemplate;
