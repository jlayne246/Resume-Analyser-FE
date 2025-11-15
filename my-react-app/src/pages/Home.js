// src/pages/Home.js
import docIcon from '../assets/icon-doc.png';    // top-right icon
import gearsIcon from '../assets/icon-gears.png'; // mid-left icon
import ideaIcon from '../assets/icon-idea.png';   // bottom-right icon

function Home() {
  return (
    <div className="home-wrap">
      {/* Row 1: The What (text left, icon right) */}
      <section className="home-row">
        <div className="home-text">
          <h3 className="home-title">The What</h3>
          <p className="home-copy">
            This is a web application, designed to allow students to upload their CVs to be checked and evaluated to determine
            what can be added to improve the CV. This gives the student's CV that extra polish, sure to catch the eye of recruiters 
            looking for students with the skills and academics they need.

          </p>
        </div>
        <div className="home-icon right">
          <img src={docIcon} alt="document icon" />
        </div>
      </section>

      {/* Row 2: The How (icon left, text right) */}
      <section className="home-row reverse">
        <div className="home-icon left">
          <img src={gearsIcon} alt="gears icon" />
        </div>
        <div className="home-text">
          <h3 className="home-title">The How</h3>
          <p className="home-copy">
            The application works by having students upload their CVs to the web appplication, it is then sent to our back end where our
            programmers have coded a parser using the python language to get clean data from the student's CV, using this clean data 
            classification algorithms are used to categorize resumes based on job roles, education or skill clusters suggestions and then suggestions are 
            generated and returned to the front-end allowing students to see the suggestions made for their resume.
          </p>
        </div>
      </section>

      {/* Row 3: The Why (text left, icon right) */}
      <section className="home-row">
        <div className="home-text">
          <h3 className="home-title">The Why</h3>
          <p className="home-copy">
            We chose this project to work on was because we noticed an upsurge in assistive tools for students, helping
            them in their academic endeavors. We therefore set out to creating a tool helps students properly 
            present their skills increasing job acceptance, improving the bridge between
            student and career. We also believe that this can be used to pave the way for future student assistive technologies, improving
            subsequent academic experiences.
          </p>
        </div>
        <div className="home-icon right">
          <img src={ideaIcon} alt="idea icon" />
        </div>
      </section>
    </div>
  );
}
export default Home;
