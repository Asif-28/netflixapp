import React, { useRef } from "react";
import { auth } from "../firebase";

import "./SignIn.css";

const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const register = (e) => {
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
    e.preventDefault();
  };
  const signInFunc = (e) => {};
  return (
    <div className="signIn">
      <form action="">
        <h1>Sign In</h1>
        <input type="email" ref={emailRef} placeholder="Email " name="" id="" />
        <input type="password" ref={passwordRef} placeholder="password" />
        <button type="submit" onClick={signInFunc}>
          Sign In
        </button>
        <h4>
          <span className="inputSignIn">New to Netflix? </span>
          <span className="inputLoginLink " onClick={register}>
            Sign Up now
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignIn;
