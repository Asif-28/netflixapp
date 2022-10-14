import React, { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./screens/Login.jsx";
import { auth } from "./firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice.js";
import ProfileScreen from "./screens/ProfileScreen.jsx";

function App() {
  const user = useSelector(selectUser);
  console.log(user);
  // const user = null;
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //Logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user.user ? (
          <Login />
        ) : (
          <>
            <Routes>
              <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
