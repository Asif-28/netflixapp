import React from "react";
import {  useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Navbar from "../Navbar";
import PlanScreen from "./PlanScreen";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user.user.email);
  return (
    <div className="pfScreen">
      <Navbar />
      <div className="pfBody">
        <h1>Edit Profile</h1>
        <div className="pfInfo">
          <img
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="pfDetails">
            <h2>{user.user.email}</h2>
            <div className="pfPlans">
              <h3>Plans</h3>
              <PlanScreen />
              <button onClick={() => auth.signOut()} className="pfLogout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
