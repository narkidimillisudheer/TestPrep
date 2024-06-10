import React from "react";
import logo from"./logo3.jpg";
import {  useNavigate } from 'react-router-dom';
export default function Navigation() {
  const Navigate = useNavigate();
    const handleLogin=()=>{
        Navigate("/auth2");
    }
  return (
    <>
    <style>
        {`
        * {
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
  margin-top: 8px;
  background: #ffff;
}
/* Home page  */
nav {
  height: 72px;

  .container {
    border-bottom: 1px solid;
  }
}
.nav {
  display: flex;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  height: 43px;

  .logo {
    display: flex;
    gap: 0.5rem;
    .favicon {
      width: 32px;
      height: 32px;
      margin: 0;
    }
    .text-icon {
      width: 144px;
      height: 32px;
      margin: 0 0 0.5rem 0;
    }
  }
  ul {
    display: flex;
    list-style: none;
    margin: 0 0 0 3rem;
  }
  li {
    width: auto;
    float: left;
    position: relative;
    height: 32px;
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: -0.005em;
    text-align: center;
  }
  li a {
    color: black;
    display: block;
    padding: 5px 25px;
    text-align: center;
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .second-options {
    font-weight: 400;
  }
  a:hover {
    border-radius: 1.5rem;
    background-color: rgb(231, 234, 237);
  }
  .header-options {
    list-style: none;
    display: flex;
  }
  .login-btn {
    width: 80px;
    height: 48px;
    background-color: rgb(23 95 252);
    border-radius: 25px;
    border: none;
    color: white;
    font-weight: 600;
    font-size: larger;
    margin-top: 0;
    margin-left: 30rem;
  }
}
        `}
    </style>
      <nav>
        <div className="container">
          <div className="nav">
            <div className="logo">
          <img src={logo} alt="logo-2" border="0" height="40px"/>
            </div>
            <div className="header-options">
              <ul>
                <li>
                  <a href="">TOEFL</a>
                </li>
                <li>
                  <a href="">IELTS</a>
                </li>
                <li>
                  <a href="">Digital SAT</a>
                </li>
                <li className="second-options">
                  <a href="">TUTOR</a>
                </li>
                <li className="second-options">
                  <a href="">TG Study Abroad</a>
                </li>
              </ul>
            </div>
            <button className="login-btn" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </nav>
    </>
  );
}