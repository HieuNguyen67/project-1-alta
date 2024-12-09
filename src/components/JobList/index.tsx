import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../redux/slices/jobSlice";
import { RootState, AppDispatch } from "../../redux/store";
import "./jobList.css";
import { Button, Col, Row, Pagination } from "antd";
import { FaDownload } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";

const JobList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const sortedJobs = [...jobs].sort((a, b) => a.jobId.localeCompare(b.jobId));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Row>
        {currentJobs.map((job) => (
          <Col lg={8} sm={24} key={job.jobId}>
            <div className="job-card" style={{ margin: "16px" }}>
              <Row>
                <Col span={4}>
                  <img
                    src={job.companyImage}
                    alt={job.companyName}
                    className="job-image"
                  />
                </Col>
                <Col span={16} style={{ paddingLeft: "10px" }}>
                  <h3>{job.jobName}</h3>
                  <p style={{ color: "grey" }}>{job.companyName}</p>
                </Col>
                <Col span={4}>
                  <a
                    href={job.jobDescriptionFile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      style={{
                        background: "rgb(255, 90, 0)",
                        color: "white",
                      }}
                    >
                      <FaDownload />
                    </Button>
                  </a>
                </Col>
              </Row>

              <p style={{ display: "none" }}>{job.jobField}</p>
              <p style={{ height: "20px" }}>{job.description}</p>
              <hr style={{ marginTop: "20px", marginBottom: "10px" }} />
              <Row>
                <Col span={12} style={{ borderRight: "2px solid #ddd" }}>
                  <p
                    style={{
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                    }}
                  >
                    <CiMail style={{ fontSize: "20px" }} />
                    &nbsp;tuyendung@alta.com.vn
                  </p>
                </Col>
                <Col span={12}>
                  <p
                    style={{
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                    }}
                  >
                    <FaPhone style={{ fontSize: "20px" }} />
                    &nbsp;0282 240 9960
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>

      {/* Phân trang */}
      <div style={{display:"grid", justifyContent:"center"}}>
        <Pagination
          current={currentPage}
          total={sortedJobs.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          style={{ textAlign: "center", marginTop: "20px"}}
        />
      </div>
    </div>
  );
};

export default JobList;
