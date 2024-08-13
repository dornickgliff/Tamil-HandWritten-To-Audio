// // src/App.js
import './App.css';
import Signup from './signup'; // Import the Signup component
import Login from './login'; // Import the Login component
import Home from './home';
import Sample from './sample'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/sample' element={<Sample/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
