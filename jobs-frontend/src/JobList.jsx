import React, { useEffect, useState } from "react";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs?q=React&location=Mumbai")
      .then((res) => res.json())
      .then((data) => setJobs(data)) // Now data is already an array of jobs
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Job Openings</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
              {job.title} — {job.company}
            </a>
            <p>{job.location}</p>
            <p>{job.description?.slice(0, 100)}...</p> {/* show preview */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
