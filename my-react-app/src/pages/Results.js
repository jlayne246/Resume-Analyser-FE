import React from "react";
import { useState } from 'react';
import { getRecommendations } from '../api/api';

function Results() {
  const [score, setScore] = useState(0);
  const [recommendation, setRecommendation] = useState({
    personal_recommendation: "None provided.",
    summary_recommendation: "None provided.",
    skill_recommendation: "None provided.",
    work_experience_recommendation: "None provided.",
    education_recommendation: "None provided.",
    volunteer_experience_recommendation: "None provided.",
    recognition_recommendation: "None provided.",
    reference_recommendation: "None provided."
  });

  React.useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations();
        setScore(data.score || 0);
        setRecommendation({
          personal_recommendation: data.personal_recommendation || "None provided.",
          summary_recommendation: data.summary_recommendation || "None provided.",
          skill_recommendation: data.skill_recommendation || "None provided.",
          work_experience_recommendation: data.work_experience_recommendation || "None provided.",
          education_recommendation: data.education_recommendation || "None provided.",
          volunteer_experience_recommendation: data.volunteer_experience_recommendation || "None provided.",
          recognition_recommendation: data.recognition_recommendation || "None provided.",
          reference_recommendation: data.reference_recommendation || "None provided."
        });
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

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
