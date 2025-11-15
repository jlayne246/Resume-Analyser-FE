import './App.css';
import './format.css';
import logo from './Logo.jpg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import UploadCV from './pages/UploadCV';
import About from './pages/About';
import UserForm from "./pages/UserForm";
import Results from "./pages/Results";
import JobSelection from "./pages/JobSelection";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <div id="img-title">
            <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
            <p className="title">Project Title</p>
          </div>
          <div id="HeaderButtons">
            <Link to="/upload"><button className="btn primary">Upload CV</button></Link>
            <Link to="/about"><button className="btn primary">About Us</button></Link>
          </div>
        </header>

        <div id="Body">
          <div id="Main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadCV />} />
              <Route path="/about" element={<About />} />
              <Route path="/user" element={<UserForm />} />
              <Route path="/results" element={<Results />} />
              <Route path="/job" element={<JobSelection />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


