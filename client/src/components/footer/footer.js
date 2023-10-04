import React  from "react";
import { NavLink} from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="upperDiv">
        <div className="linksContainer">
          <div className="linksDiv linksDiv1">
            
            <NavLink to="/register">
            <p>Udemy for Business</p>
            </NavLink>
            <NavLink to="/register">
            <p>Teach on Udemy</p>
            </NavLink>
            
          </div>
          <div className="linksDiv linksDiv2">
          <p>About us</p>
            <p>Contact us</p>
          </div>
          {/* <div className="linksDiv linksDiv3"> */}
            
            <p> </p>
          {/* </div> */}
        </div>
        <div className="linksDiv linksDiv4"></div>
      </div>
      <div className="lowerDiv">
        <img src="./logo2.png" className="udemyLogo" alt="logo"></img>
        <div className="copyrightDiv"></div>
      </div>
    </div>
  );
}

export default Footer;
