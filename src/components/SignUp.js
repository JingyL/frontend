import React, { useState } from "react";
import "./SignUp.css";
import JoblyApi from "../api/Api";
import { useHistory} from "react-router-dom";

// sign up form
function SignUp({signup}) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email:""
  });
  const [formErrors, setFormErrors] = useState("");
  const history = useHistory();

  function handleChange(e) {
    e.persist();
    console.log(e.target.value)
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await signup(formData);
    console.log(response);
    if (response["success"]){
      history.push("/");
    }else{
      setFormErrors(response.error);
    }
  }

  return (
    <div className="profile">

      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3 className="left page-name">SignUp</h3>
        <div className="card signup-card">
          <div className="card-body">
            <form>
              <div className="form-group left signup-label-font">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control left"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group left left signup-label-font">
                <label>First Name</label>
                <input
                  name="firstName"
                  className="form-control left"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group left signup-label-font">
                <label>Last Name</label>
                <input
                  name="lastName"
                  className="form-control left"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group left signup-label-font">
                <label>Email</label>
                <input
                  name="email"
                  className="form-control left"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group left signup-label-font">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control left"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {formErrors != ""
                ? <p className="danger" messages={formErrors}>{formErrors}</p>
                : null}
                
              <button
                className="btn btn-style btn-block mt-4"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>



    </div>

  );
}

export default SignUp;