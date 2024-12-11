import { h } from 'preact';
import '../css/BoxShadowCssCode.css'

const BoxShadowCssCode = ({ generateBoxShadow }) => {
  return (
    <div className="css-code-container">
      <h2>CSS code</h2>  
      <span>
        {`box-shadow: ${generateBoxShadow()};`}
      </span>
    </div>
  );
};

export default BoxShadowCssCode;
