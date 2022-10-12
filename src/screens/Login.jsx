import React, { useState } from "react";
import "./Login.css";
import SignIn from "./SignIn";

const Login = () => {
  const [signIn, setsignIn] = useState(false);
  return (
    <div className="login">
      <div className="background">
        <img
          className="loginScreen_Logo"
          src="
           //assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button className="login_btn" onClick={() => setsignIn(true)}>
          Sign In
        </button>
        <div className="loginScreenGradient"></div>
        {/* extra div is added here like a trick to provide the height of the above container  */}
        <div className="loginScreenBody">
          {signIn ? (
            <SignIn />
          ) : (
            <>
              <h1>Unlimited films,TV programmes and more.</h1>
              <h2>Watch anywhere. Cancel anytime</h2>
              <h3>
                Ready to wantch ?Enter your email to create or restart your
                membership
              </h3>
              <div className="loginScreenInput">
                <form>
                  <input type="email" placeholder="Email address" />
                  <button className="inputBtn" onClick={() => setsignIn(true)}>
                    Get Started
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
