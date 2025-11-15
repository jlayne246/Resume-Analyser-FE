import React from "react";
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations();
        console.log("Received recommendations data:", data);

        setScore(data.score || 0);
        console.log("Parsed score: ", data.score || 0);

        const return_recommendation = data.recommendation || {};
        console.log("Parsed recommendation data: ", return_recommendation);

        setRecommendation({
          personal_recommendation: return_recommendation.personal_recommendation || "None provided.",
          summary_recommendation: return_recommendation.summary_recommendation || "None provided.",
          skill_recommendation: return_recommendation.skill_recommendation || "None provided.",
          work_experience_recommendation: return_recommendation.work_experience_recommendation || "None provided.",
          education_recommendation: return_recommendation.education_recommendation || "None provided.",
          volunteer_experience_recommendation: return_recommendation.volunteer_experience_recommendation || "None provided.",
          recognition_recommendation: return_recommendation.recognition_recommendation || "None provided.",
          reference_recommendation: return_recommendation.reference_recommendation || "None provided."
        });
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="results-container">

      <div className="results-Card-Outer">
      <h1 className="formHeadings">Recommendations</h1><br></br>

      <div className="results-Card">
      <h2 className="formHeadings">Score: {score}</h2>

      <div className="field-block">
        <h2 className="formHeadings">Personal</h2>
        <p>{recommendation.personal_recommendation}</p>
      </div>

      <div className="field-block">
        <h2 className="formHeadings">Summary</h2>
        <p>{recommendation.summary_recommendation}</p>
      </div>

      <div className="field-block">
        <h2 className="formHeadings">Skills</h2>
        <p>{recommendation.skill_recommendation}</p>
      </div>

      <div className="field-block">
        <h2 className="formHeadings">Work Experience</h2>
        <p>{recommendation.work_experience_recommendation}</p>
      </div>

      <div className="field-block">
        <h2 className="formHeadings">Education</h2>
        <p>{recommendation.education_recommendation}</p>
      </div>

      <div className="field-block">
        <h2 className="formHeadings">Volunteer Experience</h2>
        <p>{recommendation.volunteer_experience_recommendation}</p>
      </div>

      <div className="field-block">
        <h2 className="formHeadings">Recognition</h2>
        <p>{recommendation.recognition_recommendation}</p>
      </div>

      <div className="field-block">
        <h2 className="formHeadings">Reference</h2>
        <p>{recommendation.reference_recommendation}</p>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Results;
