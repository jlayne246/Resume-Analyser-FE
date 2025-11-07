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
            Here goes the explanation of what the application is
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
            Here goes the explanation of how the application works
          </p>
        </div>
      </section>

      {/* Row 3: The Why (text left, icon right) */}
      <section className="home-row">
        <div className="home-text">
          <h3 className="home-title">The Why</h3>
          <p className="home-copy">
            Here goes the explanation of why the application was developed
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
