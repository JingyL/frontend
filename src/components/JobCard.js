import React, { useContext, useState } from "react";
import UserContext from "../hooks/UserContext";
import "./JobCard.css";



function JobCard({ id, handle, title, salary, equity, name, applyToJob }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { jobApplied, setJobApplied } = useContext(UserContext);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await applyToJob(currentUser.username, id);
    if (response["success"]) {
      setSuccessMsg(response["success"])
    } else {
      setErrorMsg(response.error);
    }
  }
  console.log(jobApplied)
  return (
    <div className="container">
      <div className="CompanyCard card">
        <div className="card-body">
          <h6 className="card-title">
            {title}
          </h6>
          <h6 className="description-right card-company-name">
            {name}
          </h6>
          <p className="description-left job-des"><small>salary: {salary}</small></p>
          <p className="description-left job-des"><small>equity: {equity}</small></p>
          {successMsg
            ? <p className="success">{successMsg}</p>       
            : <p className="danger">{errorMsg}</p>}

          {jobApplied.includes(id) || successMsg
          ?<button className="right applied">Applied</button>
          : <button className="right applyButton" onClick={handleSubmit}>Apply</button>}
          
        </div>
      </div>
    </div>
  );
}

export default JobCard;