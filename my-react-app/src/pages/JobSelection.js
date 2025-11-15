import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { submitDreamJob } from '../api/api';

function JobSelection() {

  const [career, setCareer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await submitDreamJob(career);
      console.log('Dream job submitted:', career);
      navigate('/results');
    } catch (error) {
      console.error('Error submitting dream job:', error);
    }
  };

  return (
    <div className="job-wrapper">
      <form className="job-card" onSubmit={handleSubmit}>
        <p className="subtitle">One last thing...</p>

        <h2 className="question">
          What job or career will you <br /> be likely applying for?
        </h2>

        <input
          type="text"
          className="job-input"
          placeholder=""
          name="job"
          onChange={(e) => setCareer(e.target.value)}
        />

        <button type="submit" className="job-button">
          Generate Feedback
        </button>
      </form>
    </div>
  );
}

export default JobSelection;
