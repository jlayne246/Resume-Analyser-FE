import filesImg from '../assets/files-illustration.png';   // update with your image path
import helpImg from '../assets/help-illustration.png';     // update with your image path
import { useState } from 'react';

function UploadCV() {
  const [fileName, setFileName] = useState('');

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
                if (f) setFileName(f.name);
              }}
            />
            <label htmlFor="cv-input" className="btn primary">Upload Your CV</label>
            {fileName && <p className="file-name">Selected: {fileName}</p>}
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
