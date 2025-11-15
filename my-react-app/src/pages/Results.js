import React from "react";

function Results() {
  const score = 0;

  const recommendation = {
    personal_recommendation: "",
    summary_recommendation: "",
    skill_recommendation: "",
    work_experience_recommendation: "",
    education_recommendation: "",
    volunteer_experience_recommendation: "",
    recognition_recommendation: "",
    reference_recommendation: ""
  };

  return (
    <div className="results-container">
      <h1>Recommendations</h1><br></br>
      <h2>Score: {score}</h2>

      <div className="field-block">
        <h2>Personal</h2>
        <p>{recommendation.personal_recommendation}</p>
      </div>

      <div className="field-block">
        <h2>Summary</h2>
        <p>{recommendation.summary_recommendation}</p>
      </div>

      <div className="field-block">
        <h2>Skills</h2>
        <p>{recommendation.skill_recommendation}</p>
      </div>

      <div className="field-block">
        <h2>Work Experience</h2>
        <p>{recommendation.work_experience_recommendation}</p>
      </div>

      <div className="field-block">
        <h2>Education</h2>
        <p>{recommendation.education_recommendation}</p>
      </div>

      <div className="field-block">
        <h2>Volunteer Experience</h2>
        <p>{recommendation.volunteer_experience_recommendation}</p>
      </div>

      <div className="field-block">
        <h2>Recognition</h2>
        <p>{recommendation.recognition_recommendation}</p>
      </div>

      <div className="field-block">
        <h2>Reference</h2>
        <p>{recommendation.reference_recommendation}</p>
      </div>

    </div>
  );
}

export default Results;
