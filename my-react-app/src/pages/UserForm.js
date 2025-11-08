function UserForm() {
  return (
    <div className="userform-page">
    <form className = "user-form">
      <h2>Personal Information</h2>
      <label>First Name:</label>
      <input type="text" name="first_name" /><br />

      <label>Last Name:</label>
      <input type="text" name="last_name" /><br />

      <label>Email:</label>
      <input type="email" name="email" /><br />

      <label>Phone:</label>
      <input type="tel" name="phone" /><br />

      <label>Location:</label>
      <input type="text" name="location" /><br />

      <label>Objective:</label>
      <textarea name="objective"></textarea><br />

      <label>Summary:</label>
      <textarea name="summary"></textarea><br />

      <h3>Links</h3>
      <label>LinkedIn:</label>
      <input type="url" name="linkedin" /><br />

      <label>Personal Website:</label>
      <input type="url" name="personal_website" /><br />

      <label>Indeed:</label>
      <input type="url" name="indeed" /><br />

      <label>GitHub:</label>
      <input type="url" name="github" /><br />

      <h3>Skills</h3>
      <label>Soft Skills:</label>
      <input type="text" name="soft_skills" placeholder="e.g. teamwork, communication" /><br />

      <label>Hard Skills:</label>
      <input type="text" name="hard_skills" placeholder="e.g. Excel, Python, React" /><br />

      <h3>Work Experience</h3>
      <label>Company:</label>
      <input type="text" name="company" /><br />

      <label>Title:</label>
      <input type="text" name="title" /><br />

      <label>Start Date:</label>
      <input type="month" name="start_date" /><br />

      <label>End Date:</label>
      <input type="month" name="end_date" /><br />

      <label>Description:</label>
      <textarea name="work_description"></textarea><br />

      <label>Location:</label>
      <input type="text" name="work_location" /><br />

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
