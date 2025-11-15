import { useEffect, useState } from 'react';
import { retrieveCVData, updateCV } from '../api/api';
import { useNavigate } from "react-router-dom";

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

  // NEW dynamic sections
  const [education, setEducation] = useState([
    {
      institution: '',
      major: '',
      start_date: '',
      end_date: '',
      degree: '',
      minor: '',
      gpa: '',
      description: '',
      relevant_coursework: '',
    },
  ]);
  const [volunteerExperiences, setVolunteerExperiences] = useState([
    {
      company: '',
      title: '',
      start_date: '',
      end_date: '',
      work_description: '',
      work_location: '',
    },
  ]);
  const [publications, setPublications] = useState([
    { title: '', publisher: '', date: '', url: '' },
  ]);
  const [awards, setAwards] = useState(['']);
  const [certifications, setCertifications] = useState(['']);
  const [references, setReferences] = useState([
    { name: '', title: '', company: '', mobile: '', email: '', organization: '', phone: '' },
  ]);

  const navigate = useNavigate();

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
            work_description: exp.description || exp.work_description || '',
            work_location: exp.location || exp.work_location || '',
          }))
        );

        // initialize education
        setEducation(
          (data?.education || []).map(ed => ({
            institution: ed.institution || '',
            major: ed.major || '',
            start_date: normalizeMonthValue(ed.start_date),
            end_date: normalizeMonthValue(ed.end_date),
            degree: ed.degree || '',
            minor: ed.minor || '',
            gpa: ed.gpa || '',
            description: ed.description || '',
            relevant_coursework: (ed.relevant_coursework && ed.relevant_coursework.join ? ed.relevant_coursework.join(', ') : ed.relevant_coursework || ''),
          }))
        );

        console.log(data?.volunteer_experience)

        setVolunteerExperiences(
          (data?.volunteer_experience || []).map(exp => ({
            ...exp,
            start_date: normalizeMonthValue(exp.start_date),
            end_date: normalizeMonthValue(exp.end_date),
            description: exp.description || '',
            location: exp.location || '',
          }))
        );

        // publications
        setPublications(
          (data?.publications || []).map(pub => ({
            title: pub.title || '',
            publisher: pub.publisher || '',
            date: normalizeMonthValue(pub.date),
            url: pub.url || '',
          }))
        );

        // awards & certifications as simple arrays of strings
        setAwards(data?.awards && data.awards.length ? data.awards : ['']);
        setCertifications(data?.certifications && data.certifications.length ? data.certifications : ['']);

        // references
        setReferences(
          (data?.references || []).map(ref => ({
            name: ref.name || '',
            title: ref.title || '',
            company: ref.company || '',
            mobile: ref.mobile || '',
            email: ref.email || '',
            organization: ref.organization || '',
            phone: ref.phone || '',
          }))
        );

      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchCVData();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    console.log('Field change:', name, value);
    setCvData(prev => ({ ...prev, [name]: value }));
  };


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

  // ---------------- Work Experience handlers ----------------
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
    setWorkExperiences(updated.length ? updated : [{
      company: '',
      title: '',
      start_date: '',
      end_date: '',
      work_description: '',
      work_location: '',
    }]);
  };

  // ---------------- Education handlers ----------------
  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institution: '',
        major: '',
        start_date: '',
        end_date: '',
        degree: '',
        minor: '',
        gpa: '',
        description: '',
        relevant_coursework: '',
      },
    ]);
  };

  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated.length ? updated : [{
      institution: '',
      major: '',
      start_date: '',
      end_date: '',
      degree: '',
      minor: '',
      gpa: '',
      description: '',
      relevant_coursework: '',
    }]);
  };

  // ---------------- Volunteer Experience handlers ----------------
  const handleVolunteerChange = (index, field, value) => {
    const updated = [...volunteerExperiences];
    updated[index][field] = value;
    setVolunteerExperiences(updated);
  };

  const addVolunteerExperience = () => {
    setVolunteerExperiences([
      ...volunteerExperiences,
      {
        organization: '',
        title: '',
        start_date: '',
        end_date: '',
        description: '',
        location: '',
      },
    ]);
  };

  const removeVolunteerExperience = (index) => {
    const updated = volunteerExperiences.filter((_, i) => i !== index);
    setVolunteerExperiences(updated.length ? updated : [{
      company: '',
      title: '',
      start_date: '',
      end_date: '',
      description: '',
      location: '',
    }]);
  };

  // ---------------- Publications handlers ----------------
  const handlePublicationChange = (index, field, value) => {
    const updated = [...publications];
    updated[index][field] = value;
    setPublications(updated);
  };

  const addPublication = () => {
    setPublications([...publications, { title: '', publisher: '', date: '', url: '' }]);
  };

  const removePublication = (index) => {
    const updated = publications.filter((_, i) => i !== index);
    setPublications(updated.length ? updated : [{ title: '', publisher: '', date: '', url: '' }]);
  };

  // ---------------- Awards handlers (simple strings) ----------------
  const updateAward = (index, value) => {
    const copy = [...awards];
    copy[index] = value;
    setAwards(copy);
  };
  const addAward = () => setAwards([...awards, '']);
  const removeAward = (index) => {
    const copy = awards.filter((_, i) => i !== index);
    setAwards(copy.length ? copy : ['']);
  };

  // ---------------- Certifications handlers (simple strings) ----------------
  const updateCertification = (index, value) => {
    const copy = [...certifications];
    copy[index] = value;
    setCertifications(copy);
  };
  const addCertification = () => setCertifications([...certifications, '']);
  const removeCertification = (index) => {
    const copy = certifications.filter((_, i) => i !== index);
    setCertifications(copy.length ? copy : ['']);
  };

  // ---------------- References handlers ----------------
  const handleReferenceChange = (index, field, value) => {
    const updated = [...references];
    updated[index][field] = value;
    setReferences(updated);
  };

  const addReference = () => {
    setReferences([
      ...references,
      { name: '', title: '', company: '', mobile: '', email: '', organization: '', phone: '' },
    ]);
  };

  const removeReference = (index) => {
    const updated = references.filter((_, i) => i !== index);
    setReferences(updated.length ? updated : [{ name: '', title: '', company: '', mobile: '', email: '', organization: '', phone: '' }]);
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
    // Year only (e.g. "2024")
    if (/^\d{4}$/.test(value)) {
      return `${value}-01`; // default to January
    }
    // For "Present" or invalid text
    return "";
  }

  // Form submit — you can expand this to gather whole object and send it
  const handleSubmit = async (e) => {
    e.preventDefault();
    const output = {
      ...cvData,
      soft_skills: softSkills,
      hard_skills: hardSkills,
      work_experience: workExperiences,
      education,
      publications,
      awards,
      certifications,
      references,
    };
    console.log('FORM OUTPUT:', output);

    try {
      const response = await updateCV(output);
      console.log('CV updated successfully:', response);
      alert('CV updated successfully.');
      navigate('/job');
    } catch (error) {
      console.error('Error parsing CV:', error);
      alert('Failed to update CV. Please try again.');
    }
  };

  // unified button styles
  const addBtnStyle = {
    background: '#16a34a', // green
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
  };
  const removeBtnStyle = {
    background: '#dc2626', // red
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
  };
  const submitBtnStyle = {
    background: '#1e40af', // blue
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
  };

  // small helper for default sections
  const sectionBoxStyle = { border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '8px' };

  return (
    <div className="userform-page">
      <form className="user-form" onSubmit={handleSubmit}>
        <h3 className="formHeadings">Personal Information</h3>
        <div className="InfoForm">

          <div className="FormRow">
            <label>First Name:</label>
            <input className="input" type="text" name="first_name" value={cvData?.first_name || ''} onChange={handleFieldChange} />
          </div>

          <div className="FormRow">
            <label>Last Name:</label>
            <input className="input" type="text" name="last_name" value={cvData?.last_name || ''} onChange={handleFieldChange} />
          </div>

          <div className="FormRow">
            <label>Email:</label>
            <input className="input" type="email" name="email" value={cvData?.email || ''} onChange={handleFieldChange} />
          </div>

          <div className="FormRow">
            <label>Phone:</label>
            <input className="input" type="tel" name="phone" value={cvData?.phone || ''} onChange={handleFieldChange} />
          </div>

          <div className="FormRow">
            <label>Address:</label>
            <input className="input" type="text" name="address" value={cvData?.address || ''} onChange={handleFieldChange} />
          </div>

          <div className="FormRow">
            <label>Objective:</label>
            <textarea className="textArea" name="objective" value={cvData?.objective || ''} onChange={handleFieldChange}></textarea>
          </div>

          <div className="FormRow">
            <label>Summary:</label>
            <textarea className="textArea" name="summary" value={cvData?.summary || ''} onChange={handleFieldChange}></textarea>
          </div>
        </div>

        <h3 className="formHeadings">Links</h3>

        <div className="InfoForm">
          <div className="FormRow">
            <label>LinkedIn:</label>
            <input className="input" type="url" name="linkedin" value={cvData?.links?.linkedin || ''} onChange={(e) =>
              setCvData(prev => ({
                ...prev,
                links: { ...prev.links, linkedin: e.target.value },
              }))
            } />
          </div>

          <div className="FormRow">
            <label>Personal Website:</label>
            <input className="input" type="url" name="personal_website" value={cvData?.links?.personal_website || ''} onChange={(e) =>
              setCvData(prev => ({
                ...prev,
                links: { ...prev.links, personal_website: e.target.value },
              }))
            } />
          </div>

          <div className="FormRow">
            <label>Indeed:</label>
            <input className="input" type="url" name="indeed" value={cvData?.links?.indeed || ''} onChange={(e) =>
              setCvData(prev => ({
                ...prev,
                links: { ...prev.links, indeed: e.target.value },
              }))
            } />
          </div>

          <div className="FormRow">
            <label>GitHub:</label>
            <input className="input" type="url" name="github" value={cvData?.links?.github || ''} onChange={(e) =>
              setCvData(prev => ({
                ...prev,
                links: { ...prev.links, github: e.target.value },
              }))
            } />
          </div>
        </div>

        <h3 className="formHeadings">Skills</h3>
        <div className="InfoForm">
          <div className="FormRow">
            <label>Soft Skills:</label>
            <input
              className="input" 
              type="text"
              name="soft_skills"
              placeholder="e.g. teamwork, communication"
              value={softSkills.join(', ')}
              onChange={handleSoftChange}
            />
          </div>

          <div className="FormRow">
            <label>Hard Skills:</label>
            <input
              className="input" 
              type="text"
              name="hard_skills"
              placeholder="e.g. Excel, Python, React"
              value={hardSkills.join(', ')}
              onChange={handleHardChange}
            />
          </div>
        </div>


        {/* Work Experience */}
        <h3 className="formHeadings">Work Experience</h3>
        <div className="InfoForm">
          {workExperiences.map((exp, index) => (
            <div key={index} style={sectionBoxStyle}>

              <div className="FormRow">
                <label>Company:</label>
                <input
                  className="input" 
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleWorkChange(index, 'company', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>Title:</label>
                <input
                  className="input" 
                  type="text"
                  name="title"
                  value={exp.title}
                  onChange={(e) => handleWorkChange(index, 'title', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>Start Date:</label>
                <input
                  className="input" 
                  type="month"
                  name="start_date"
                  value={exp.start_date}
                  onChange={(e) => handleWorkChange(index, 'start_date', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>End Date:</label>
                <input
                  className="input" 
                  type="month"
                  name="end_date"
                  value={exp.end_date}
                  onChange={(e) => handleWorkChange(index, 'end_date', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>Description:</label>
                <textarea
                  className="textArea"
                  name="work_description"
                  value={exp.work_description}
                  onChange={(e) => handleWorkChange(index, 'work_description', e.target.value)}
                ></textarea>
              </div>

              <div className="FormRow">
                <label>Location:</label>
                <input
                  className="input" 
                  type="text"
                  name="work_location"
                  value={exp.work_location}
                  onChange={(e) => handleWorkChange(index, 'work_location', e.target.value)}
                />
              </div>

              <div style={{ marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  style={removeBtnStyle}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addWorkExperience}
            style={{ ...addBtnStyle, marginBottom: '20px' }}
          >
            + Add Another Experience
          </button>
        </div>

        {/* Education (dynamic) */}
        <h3 className="formHeadings">Education</h3>
        <div className="InfoForm">
          {education.map((ed, index) => (
            <div key={index} style={sectionBoxStyle}>

              <div className="FormRow">
                <label>Institution:</label>
                <input className="input" type="text" value={ed.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Major:</label>
                <input className="input" type="text" value={ed.major} onChange={(e) => handleEducationChange(index, 'major', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Start Date:</label>
                <input className="input" type="month" value={ed.start_date} onChange={(e) => handleEducationChange(index, 'start_date', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>End Date:</label>
                <input className="input" type="month" value={ed.end_date} onChange={(e) => handleEducationChange(index, 'end_date', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Degree:</label>
                <input className="input" type="text" value={ed.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Minor:</label>
                <input className="input" type="text" value={ed.minor} onChange={(e) => handleEducationChange(index, 'minor', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>GPA:</label>
                <input className="input" type="text" value={ed.gpa} onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Description:</label>
                <textarea className="textArea" value={ed.description} onChange={(e) => handleEducationChange(index, 'description', e.target.value)}></textarea><br />
              </div>
              <div className="FormRow">
                <label>Relevant Coursework:</label>
                <input className="input" type="text" value={ed.relevant_coursework} onChange={(e) => handleEducationChange(index, 'relevant_coursework', e.target.value)} /><br />
              </div>
              <div style={{ marginTop: 6 }}>
                <button type="button" onClick={() => addEducation()} style={{ ...addBtnStyle, marginRight: 8 }}>Add education</button>
                {education.length > 1 && <button type="button" onClick={() => removeEducation(index)} style={removeBtnStyle}>Remove</button>}
              </div>
            </div>
          ))}
        </div>

        {/* Volunteer Experience */}
        <h3 className="formHeadings">Volunteer Experience</h3>

        <div className="InfoForm">
          {volunteerExperiences.map((vol, index) => (
            <div key={index}>
              <div className="FormRow">
                <label>Organization:</label>
                <input
                  className="input" 
                  type="text"
                  name="organization"
                  value={vol.organization}
                  onChange={(e) => handleVolunteerChange(index, 'organization', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>Title:</label>
                <input
                  className="input" 
                  type="text"
                  name="volunteer_title"
                  value={vol.title}
                  onChange={(e) => handleVolunteerChange(index, 'volunteer_title', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>Start Date:</label>
                <input
                  className="input" 
                  type="month"
                  name="volunteer_start"
                  value={vol.start_date}
                  onChange={(e) => handleVolunteerChange(index, 'volunteer_start', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>End Date:</label>
                <input
                  className="input" 
                  type="month"
                  name="volunteer_end"
                  value={vol.end_date}
                  onChange={(e) => handleVolunteerChange(index, 'volunteer_end', e.target.value)}
                />
              </div>

              <div className="FormRow">
                <label>Description:</label>
                <textarea
                  className="textArea"
                  name="volunteer_description"
                  value={vol.description}
                  onChange={(e) => handleVolunteerChange(index, 'volunteer_description', e.target.value)}
                ></textarea>
              </div>

              <div className="FormRow">
                <label>Location:</label>
                <input
                  
                  className="input" 
                  type="text"
                  name="volunteer_location"
                  value={vol.location}
                  onChange={(e) => handleVolunteerChange(index, 'volunteer_location', e.target.value)}
                />
              </div>

              <div style={{ marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => removeVolunteerExperience(index)}
                  style={removeBtnStyle}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addVolunteerExperience}
            style={{ ...addBtnStyle, marginBottom: '20px' }}
          >
            + Add Another Volunteer Experience
          </button>
        </div>

        {/* Awards (dynamic simple strings) */}
        <h3 className="formHeadings">Awards</h3>
        <div className="InfoForm">
          {awards.map((a, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div className="FormRow">
                <input className="input" type="text" value={a} onChange={(e) => updateAward(idx, e.target.value)} placeholder="Award name" />
              </div>
              <button type="button" onClick={() => addAward()} style={{ ...addBtnStyle, marginLeft: 8 }}>Add award</button>
              {awards.length > 1 && <button type="button" onClick={() => removeAward(idx)} style={{ ...removeBtnStyle, marginLeft: 6 }}>Remove</button>}
            </div>
          ))}
        </div>

        {/* Publications (dynamic) */}
        <h3 className="formHeadings">Publications</h3>

        <div className="InfoForm">
          {publications.map((p, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, borderRadius: 8 }}>

              <div className="FormRow">
                <label>Title:</label>
                <input className="input" type="text" value={p.title} onChange={(e) => handlePublicationChange(index, 'title', e.target.value)} />
              </div>

              <div className="FormRow">
                <label>Publisher:</label>
                <input className="input" type="text" value={p.publisher} onChange={(e) => handlePublicationChange(index, 'publisher', e.target.value)} />
              </div>

              <div className="FormRow">
                <label>Date:</label>
                <input className="input" type="month" value={p.date} onChange={(e) => handlePublicationChange(index, 'date', e.target.value)} />
              </div>

              <div className="FormRow">
                <label>URL:</label>
                <input className="input" type="url" value={p.url} onChange={(e) => handlePublicationChange(index, 'url', e.target.value)} />
              </div>
              <div style={{ marginTop: 6 }}>
                <button type="button" onClick={() => addPublication()} style={{ ...addBtnStyle, marginRight: 8 }}>Add publication</button>
                {publications.length > 1 && <button type="button" onClick={() => removePublication(index)} style={removeBtnStyle}>Remove</button>}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications (dynamic strings) */}
        <h3 className="formHeadings">Certifications</h3>

        <div className="InfoForm">
          {certifications.map((c, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <input className="input" type="text" value={c} onChange={(e) => updateCertification(idx, e.target.value)} placeholder="Certification name" />
              <button type="button" onClick={() => addCertification()} style={{ ...addBtnStyle, marginLeft: 8 }}>Add Certificate</button>
              {certifications.length > 1 && <button type="button" onClick={() => removeCertification(idx)} style={{ ...removeBtnStyle, marginLeft: 6 }}>Remove</button>}
            </div>
          ))}
        </div>
        {/* References (dynamic) */}
        <h3 className="formHeadings">References</h3>

        <div className="InfoForm">
          {references.map((r, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, borderRadius: 8 }}>

              <div className="FormRow">
                <label>Name:</label>
                <input className="input" type="text" value={r.name} onChange={(e) => handleReferenceChange(index, 'name', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Title:</label>
                <input className="input" type="text" value={r.title} onChange={(e) => handleReferenceChange(index, 'title', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Company:</label>
                <input className="input" type="text" value={r.company} onChange={(e) => handleReferenceChange(index, 'company', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Mobile:</label>
                <input className="input" type="tel" value={r.mobile} onChange={(e) => handleReferenceChange(index, 'mobile', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Email:</label>
                <input className="input" type="email" value={r.email} onChange={(e) => handleReferenceChange(index, 'email', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Organization:</label>
                <input className="input" type="text" value={r.organization} onChange={(e) => handleReferenceChange(index, 'organization', e.target.value)} /><br />
              </div>
              <div className="FormRow">
                <label>Phone:</label>
                <input className="input" type="tel" value={r.phone} onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)} /><br />
              </div>
              <div style={{ marginTop: 6 }}>
                <button type="button" onClick={() => addReference()} style={{ ...addBtnStyle, marginRight: 8 }}>Add reference</button>
                {references.length > 1 && <button type="button" onClick={() => removeReference(index)} style={removeBtnStyle}>Remove</button>}
              </div>
            </div>
          ))}
        </div>
        <br />
        <button type="submit" style={submitBtnStyle}>Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
