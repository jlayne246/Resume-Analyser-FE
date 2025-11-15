function JobSelection() {
  return (
    <div className="job-wrapper">
      <form className="job-card" onSubmit={(e) => e.preventDefault()}>
        <p className="subtitle">One last thing...</p>

        <h2 className="question">
          What job or career will you <br /> be likely applying for?
        </h2>

        <input
          type="text"
          className="job-input"
          placeholder=""
          name="job"
        />

        <button type="submit" className="job-button">
          Generate Feedback
        </button>
      </form>
    </div>
  );
}

export default JobSelection;
