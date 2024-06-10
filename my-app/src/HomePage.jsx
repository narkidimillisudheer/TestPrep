import React from 'react'
import Navigation from '../Navigation'
import Tofel from './gateway-toefl.png';
import Ielts from './gateway-ielts.png';
import {  useNavigate } from 'react-router-dom';
function HomePage() {
    const Navigate = useNavigate();
    const handleLogin=()=>{
        Navigate("/auth2");
    }
  return (
    <>
    <style>
        {`
            section {
  margin: 0;
  width: 100%;
  height: 30%;
}
.section-one {
  display: flex;
  margin: 0;

  .section-one,
  .container {
    display: flex;
    gap: 3rem;
    padding: 40px;
    margin: 71px;
  }
  .left-box {
    width: 900px;
    height: 560px;
    border-radius: 30px;
    background-image: url("https://i.ibb.co/dbjw8Fv/main-section.webp");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .right-box {
    width: 260px;
    height: 560px;
    .card {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 140px;
    }
    /* .card :hover {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    } */
    .card h3 {
      width: 100px;
      font-size: 36px;
      color: #007bff;
      margin-left: -15px;
      margin-bottom: 15px;
    }
    .card h5 {
      width: 170px;
      font-size: 16px;
      color: #333;
      margin-left: -15px;
      margin-bottom: 20px;
    }
  }
  img {
    width: 120px;
    height: 120px;
    margin-left: -30px;
    margin-top: 15px;
  }
  .image {
    display: flex;
    height: 90px;
  }
  .arrow {
    width: 30px;
    height: 30px;
    margin-top: 75px;
    margin-left: 35px;
  }
}
.sticky-div {
  justify-content: center;
  align-items: center;
}
.sticky-btn {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 15%;
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.sticky-btn:hover {
  background-color: #035ec0;
}
        `}
    </style>
    <Navigation/>
    <section>
        <div className="section-one">
          <div className="container">
            <div className="left-box">
            </div>
            <div className="right-box">
              <div class="card">
                <h3>TOEFL</h3>
                <h5>Global No 1. AI TOEFL</h5>
                <div class="image">
                  <img src={Tofel} alt="TOEFL Logo" />
                  <div class="arrow" onClick={handleLogin}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37999 21.01C7.86999 21.5 8.65999 21.5 9.14999 21.01L17.46 12.7C17.85 12.31 17.85 11.68 17.46 11.29L9.14999 2.98005C8.65999 2.49005 7.86999 2.49005 7.37999 2.98005C6.88999 3.47005 6.88999 4.26005 7.37999 4.75005L14.62 12L7.36999 19.25C6.88999 19.73 6.88999 20.5301 7.37999 21.01Z"
                        fill="#515151"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="card">
                <h3>IELTS</h3>
                <h5>Global No 1. AI IELTS</h5>
                <div class="image">
                  <img src={Ielts} alt="TOEFL Logo" />
                  <div class="arrow" onClick={handleLogin}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37999 21.01C7.86999 21.5 8.65999 21.5 9.14999 21.01L17.46 12.7C17.85 12.31 17.85 11.68 17.46 11.29L9.14999 2.98005C8.65999 2.49005 7.86999 2.49005 7.37999 2.98005C6.88999 3.47005 6.88999 4.26005 7.37999 4.75005L14.62 12L7.36999 19.25C6.88999 19.73 6.88999 20.5301 7.37999 21.01Z"
                        fill="#515151"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="sticky-div">
        <button className="sticky-btn" onClick={handleLogin}>Take a Mock Test</button>
      </div>
    </>
  )
}

export default HomePage
