import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/home';
import About from './pages/about';
import Err404 from './pages/err404';

function App() {
  return (
    <Router>
      <div className="App">
        <div id='page-body'>
          <Routes>
            <Route path="/" element={<HomePage/>} exact />
            <Route path="/about" element={<About/>} />
            <Route path='*' element={<Err404/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
