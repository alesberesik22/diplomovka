import React, { useEffect, useState } from "react";
import Background from "../components/images/background.png";

import "./Login.css";

function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    handleLogin,
  } = props;

  return (
    <section
      className="login"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="loginContainer">
        <label>Prihlasovacie meno</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Heslo</label>
        <input
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          <button onClick={handleLogin}>Prihlasenie</button>
        </div>
      </div>
    </section>
  );
}

export default Login;
