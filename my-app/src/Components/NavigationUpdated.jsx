import React,{useEffect}from 'react';
import logo from './logo4.jpg';
import { signOut } from "supertokens-auth-react/recipe/session";
import Session from "supertokens-auth-react/recipe/session";
import { useNavigate } from 'react-router-dom';
function NavigationUpdated() {
  const navigate=useNavigate();
  useEffect(() => {
    async function checkSession() {
        if (await Session.doesSessionExist()) {
            const id = await Session.getUserId();
        } else {
            navigate('/auth2');
        }
    }
    checkSession();
}, [navigate]);
  async function onLogout() {
    await signOut();
    alert("Logout successful");
    navigate('/auth2'); // Redirect using navigate
}
  return (
    <>
      <style>
        {`
          .navBar2 {
            height: 60px;
            width: 97%;
            background-color: #007bff; /* Change this to your desired background color */
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px; /* Add some padding for better spacing */
          }

          .logo {
            height: 40px;
            border: 0;
            color: black;
          }

          .button-container {
            display: flex;
            align-items: center;
          }

          .navButton {
            padding: 10px 20px;
            background-color: #fff;
            color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }

          .navButton:hover {
            background-color: #e7e7e7;
          }
        `}
      </style>
      <div className="navBar2">
        <img src={logo} alt="logo-2" className="logo" />
        <div className="button-container">
          <button className="navButton" onClick={onLogout}>Log out</button>
        </div>
      </div>
    </>
  );
}

export default NavigationUpdated;
