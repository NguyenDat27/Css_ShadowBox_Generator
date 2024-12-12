import { h } from 'preact';
import BoxShadowGenerator from './components/BoxShadowGenerator';
import Header from './components/Heder';

const App = () => {
  return (
    <div>
      <Header/>
      <BoxShadowGenerator />
    </div>
  );
};

export default App;
