import { h } from 'preact';
import BoxShadowGenerator from './components/BoxShadowGenerator';
import Header from './components/Heder';

const App = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <BoxShadowGenerator />
      </div>
    </div>
  );
};

export default App;
