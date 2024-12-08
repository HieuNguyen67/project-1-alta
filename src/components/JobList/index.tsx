import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../redux/slices/jobSlice";
import { RootState, AppDispatch } from "../../redux/store";
import "./jobList.css";
import { Button } from "antd";
import { FaDownload } from "react-icons/fa";

const JobList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
     

      {jobs.map((job) => (
        <div key={job.jobId} className="job-card">
          <img
            src={job.companyImage}
            alt={job.companyName}
            className="job-image"
          />
          <h3>{job.jobName}</h3>
          <h3>{job.companyName}</h3>
          <p style={{display:"none"}}>{job.jobField}</p>
          <p>{job.description}</p>
          <a
            href={job.jobDescriptionFile}
            target="_blank"
            rel="noopener noreferrer"
          >
           <Button style={{background:"rgb(255, 90, 0)", color:"white"}}><FaDownload/></Button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobList;
