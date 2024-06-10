import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Webroutes from './components/Webroutes';

function App() {

  return (
    <div className="App">
      <Router>
        <Webroutes />
      </Router>
    </div>
  );
}

export default App;
