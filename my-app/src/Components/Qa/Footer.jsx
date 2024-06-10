import React from 'react';

function Footer() {
  return (
    <>
      <style>
        {`
          .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            overflow: hidden;
            z-index: -1; /* Ensure it stays above other elements */
          }
          .footer svg {
            display: block;
            width: 100%;
            height: auto;
          }
        `}
      </style>
      <div className="footer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fillOpacity="1" d="M0,160L60,154.7C120,149,240,139,360,160C480,181,600,235,720,250.7C840,267,960,245,1080,234.7C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </>
  );
}

export default Footer;
