import { useEffect, useState } from 'react';
import { retrieveCVData } from '../api/api';

function UserForm() {
  const [cvData, setCvData] = useState(null);
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([
    {
      company: '',
      title: '',
      start_date: '',
      end_date: '',
      work_description: '',
      work_location: '',
    },
  ]);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const data = await retrieveCVData();
        setCvData(data);
        setSoftSkills(data?.soft_skills || []);
        setHardSkills(data?.hard_skills || []);
        setWorkExperiences(
          (data?.work_experience || []).map(exp => ({
            ...exp,
            start_date: normalizeMonthValue(exp.start_date),
            end_date: normalizeMonthValue(exp.end_date),
          }))
        );
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchCVData();
  }, []);

  const handleSoftChange = (e) => {
    const values = e.target.value
      .split(',')
      .map(v => v.trim())
      .filter(v => v);
    setSoftSkills(values);
  };

  const handleHardChange = (e) => {
    const values = e.target.value
      .split(',')
      .map(v => v.trim())
      .filter(v => v);
    setHardSkills(values);
  };

  // 🧩 Work Experience dynamic handlers
  const handleWorkChange = (index, field, value) => {
    const updated = [...workExperiences];
    updated[index][field] = value;
    setWorkExperiences(updated);
  };

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        company: '',
        title: '',
        start_date: '',
        end_date: '',
        work_description: '',
        work_location: '',
      },
    ]);
  };

  const removeWorkExperience = (index) => {
    const updated = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updated);
  };

  function normalizeMonthValue(value) {
    if (!value) return "";
    if (/^\d{4}-\d{2}$/.test(value)) return value; // already correct (YYYY-MM)
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value.slice(0, 7); // trim day part
    if (/^[A-Za-z]+\s\d{4}$/.test(value)) {
      // e.g. "May 2024"
      const [monthName, year] = value.split(" ");
      const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
      return `${year}-${String(monthIndex).padStart(2, "0")}`;
    }
    // For "Present" or invalid text
    return "";
  }


  return (
    <div className="userform-page">
      <form className="user-form">
        <h2>Personal Information</h2>
        <label>First Name:</label>
        <input type="text" name="first_name" defaultValue={cvData?.first_name || ''} /><br />

        <label>Last Name:</label>
        <input type="text" name="last_name" defaultValue={cvData?.last_name || ''} /><br />

        <label>Email:</label>
        <input type="email" name="email" defaultValue={cvData?.email || ''} /><br />

        <label>Phone:</label>
        <input type="tel" name="phone" defaultValue={cvData?.phone || ''} /><br />

        <label>Location:</label>
        <input type="text" name="location" defaultValue={cvData?.location || ''} /><br />

        <label>Objective:</label>
        <textarea name="objective" defaultValue={cvData?.objective || ''}></textarea><br />

        <label>Summary:</label>
        <textarea name="summary" defaultValue={cvData?.summary || ''}></textarea><br />

        <h3>Links</h3>
        <label>LinkedIn:</label>
        <input type="url" name="linkedin" defaultValue={cvData?.links?.linkedin || ''} /><br />

        <label>Personal Website:</label>
        <input type="url" name="personal_website" defaultValue={cvData?.links?.personal_website || ''} /><br />

        <label>Indeed:</label>
        <input type="url" name="indeed" defaultValue={cvData?.links?.indeed || ''} /><br />

        <label>GitHub:</label>
        <input type="url" name="github" defaultValue={cvData?.links?.github || ''} /><br />

        <h3>Skills</h3>
        <label>Soft Skills:</label>
        <input
          type="text"
          name="soft_skills"
          placeholder="e.g. teamwork, communication"
          defaultValue={softSkills.join(', ')}
          onChange={handleSoftChange}
        /><br />

        <label>Hard Skills:</label>
        <input
          type="text"
          name="hard_skills"
          placeholder="e.g. Excel, Python, React"
          defaultValue={hardSkills.join(', ')}
          onChange={handleHardChange}
        /><br />

        {/* ✅ Work Experience Section (Dynamic) */}
        <h3>Work Experience</h3>
        {workExperiences.map((exp, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          >
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleWorkChange(index, 'company', e.target.value)}
            /><br />

            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={exp.title}
              onChange={(e) => handleWorkChange(index, 'title', e.target.value)}
            /><br />

            <label>Start Date:</label>
            <input
              type="month"
              name="start_date"
              value={exp.start_date}
              onChange={(e) => handleWorkChange(index, 'start_date', e.target.value)}
            /><br />

            <label>End Date:</label>
            <input
              type="month"
              name="end_date"
              value={exp.end_date}
              onChange={(e) => handleWorkChange(index, 'end_date', e.target.value)}
            /><br />

            <label>Description:</label>
            <textarea
              name="work_description"
              value={exp.work_description}
              onChange={(e) => handleWorkChange(index, 'work_description', e.target.value)}
            ></textarea><br />

            <label>Location:</label>
            <input
              type="text"
              name="work_location"
              value={exp.work_location}
              onChange={(e) => handleWorkChange(index, 'work_location', e.target.value)}
            /><br />

            <button
              type="button"
              onClick={() => removeWorkExperience(index)}
              style={{
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                marginTop: '5px',
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addWorkExperience}
          style={{
            background: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            marginBottom: '20px',
          }}
        >
          + Add Another Experience
        </button>

        {/* The rest of your form below remains unchanged */}
        <h3>Education</h3>
        <label>Institution:</label>
        <input type="text" name="institution" /><br />

        <label>Major:</label>
        <input type="text" name="major" /><br />

        <label>Start Date:</label>
        <input type="month" name="edu_start" /><br />

        <label>End Date:</label>
        <input type="month" name="edu_end" /><br />

        <label>Degree:</label>
        <input type="text" name="degree" /><br />

        <label>Minor:</label>
        <input type="text" name="minor" /><br />

        <label>GPA:</label>
        <input type="text" name="gpa" /><br />

        <label>Description:</label>
        <textarea name="edu_description"></textarea><br />

        <label>Relevant Coursework:</label>
        <input type="text" name="relevant_coursework" /><br />

        <h3>Volunteer Experience</h3>
        <label>Organization:</label>
        <input type="text" name="organization" /><br />

        <label>Title:</label>
        <input type="text" name="volunteer_title" /><br />

        <label>Start Date:</label>
        <input type="month" name="volunteer_start" /><br />

        <label>End Date:</label>
        <input type="month" name="volunteer_end" /><br />

        <label>Description:</label>
        <textarea name="volunteer_description"></textarea><br />

        <label>Location:</label>
        <input type="text" name="volunteer_location" /><br />

        <h3>Awards</h3>
        <input type="text" name="awards" placeholder="Award Name" /><br />

        <h3>Publications</h3>
        <label>Title:</label>
        <input type="text" name="pub_title" /><br />

        <label>Publisher:</label>
        <input type="text" name="pub_publisher" /><br />

        <label>Date:</label>
        <input type="month" name="pub_date" /><br />

        <label>URL:</label>
        <input type="url" name="pub_url" /><br />

        <h3>Certifications</h3>
        <input type="text" name="certifications" placeholder="Certification Name" /><br />

        <h3>References</h3>
        <label>Name:</label>
        <input type="text" name="ref_name" /><br />

        <label>Title:</label>
        <input type="text" name="ref_title" /><br />

        <label>Company:</label>
        <input type="text" name="ref_company" /><br />

        <label>Mobile:</label>
        <input type="tel" name="ref_mobile" /><br />

        <label>Email:</label>
        <input type="email" name="ref_email" /><br />

        <label>Organization:</label>
        <input type="text" name="ref_organization" /><br />

        <label>Phone:</label>
        <input type="tel" name="ref_phone" /><br />

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
