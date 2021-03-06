import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
import NavBar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import { useState } from 'react';
import JoblyApi from "./api/Api";
import Routes from './routes/Routes';
import jwt_decode from "jwt-decode";
import UserContext from "./hooks/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token");
  const [jobApplied, setJobApplied] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);
  
  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.log(currentUser.applications)
          setJobApplied(currentUser.applications);
        } catch (err) {
          setCurrentUser(null);
        }      
      }
      setInfoLoaded(true);
    }  
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(data){
    try{
      let token = await JoblyApi.login(data);
      setToken(token);
      return {"success":token};
    }catch(errors){
      return {"error": errors};
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    setJobApplied([])
  }

  async function signup(data){
    try{
      let token = await JoblyApi.signup(data);;
      setToken(token);
      return {"success":token};
    }catch(errors){
      return {"error": errors};
    }
  }

  async function changeProfile(username, data){
    try{
      let user = await JoblyApi.changeProfile(username, data);
      setCurrentUser(user)
      return {"success":"Upload Successfuly!"};
    }catch(errors){
      return {"error": errors};
    }
  }

  async function applyToJob(username, jobId){
    try{
      let res = await JoblyApi.applyToJob(username, jobId);
      setJobApplied(f => ([...f, res.applied]));
      return {"success":"Applied Successfuly!"};
    }catch(errors){
      return {"error": errors};
    }
  }

  if (!infoLoaded) return <p>Loading</p>;

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{currentUser, jobApplied}}>
        <NavBar logout={logout}/>
        <Routes login={login} signup={signup} changeProfile={changeProfile} applyToJob={applyToJob}></Routes>
      </UserContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
