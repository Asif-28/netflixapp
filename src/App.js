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

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
      } else {
        //Logged out
      }
    });
    return unsubscribe;
  }, []);
  const user = null;

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
