import './App.css';
import './format.css';
import logo from './Logo.jpg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import UploadCV from './pages/UploadCV';
import About from './pages/About';
import UserForm from "./pages/UserForm";

function App() {
  return (
    <Router>
    <div className="App">
      <header>
        <div id="img-title">
          <img className="logo" src={logo} alt="logo" />
          <p>Project Title</p>
        </div>
        <div id="HeaderButtons">
          <Link to="/"><button className="navButtons">Home Page</button></Link>
            <Link to="/upload"><button className="navButtons">Upload CV</button></Link>
            <Link to="/about"><button className="navButtons">About Us</button></Link>
            
        </div>
      </header>

      <div id="Body">
        <div id="Main">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadCV />} />
              <Route path="/about" element={<About />} />
              <Route path="/user" element={<UserForm />} />
            </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;


