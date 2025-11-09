import filesImg from '../assets/files-illustration.png';   // update with your image path
import helpImg from '../assets/help-illustration.png';     // update with your image path
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { parseCV } from '../api/api';

function UploadCV() {  
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  console.log('env: ', process.env)

  const handleFileSubmission = async (event) => {
    event.preventDefault();

    console.log('Submitting file:', file.name);
    
    try {
      const response = await parseCV(file);
      console.log('CV parsed successfully:', response);
      navigate('/user');
    } catch (error) {
      console.error('Error parsing CV:', error);
      window.alert('Failed to upload CV. Please try again.');
    }
  }

  return (
    <div className="upload-page">
      <div className="upload-bg">
        <div className="page-track">
          {/* Blue Upload Card */}
          <section className="upload-card">
            <img className="upload-hero" src={filesImg} alt="Files illustration" />
            <input
              id="cv-input"
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFile(f);
              }}
            />
            <label htmlFor="cv-input" className="btn primary">Upload Your CV</label>
            {file && <p className="file-name">Selected: {file.name}</p>}

            {file && (
              <button className="btn primary" onClick={handleFileSubmission}> Continue </button>
            )}
          </section>

          {/* Info Section */}
          <section className="upload-info">
            <img className="info-illustration" src={helpImg} alt="Team reviewing CV" />
            <p className="info-copy">
              Here you can upload your CV to be evaluated by our website to give you
              recommendations on how to improve your CV so you keep that competitive edge.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UploadCV;
