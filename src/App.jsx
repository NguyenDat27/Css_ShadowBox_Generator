import { h } from 'preact';
import BoxShadowGenerator from './components/BoxShadowGenerator';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header/>
      <BoxShadowGenerator />
    </div>
  );
};

export default App;
