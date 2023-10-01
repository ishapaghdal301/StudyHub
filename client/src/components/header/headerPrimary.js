import React, { useState } from "react";
import "./headerPrimary.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HeaderPrimary() {
  const navigate = useNavigate();
  
  const [isauthenticated, setIsauthenticated] = useState(
    localStorage.getItem("isauthenticated") === "true"
  );

  const logout = () => {
    localStorage.setItem("isauthenticated", false);
    setIsauthenticated(false);
    localStorage.removeItem("user");
    navigate("/");
    toast.success("You have been logged out successfully!");

  };

  return (
    <div className="headerPrimary">
      <div className="left part">
        <NavLink to={"/"}>
          <div className="udemyLogo">
            <img src="./logo.png" style={{height:"90px"}} className="logo" alt="logo"></img>
          </div>
        </NavLink>
        
        <div className="categoriesDiv">
          <span className="categories" onClick={function(){navigate("/categories")}}>Categories</span>
        </div>
        
      </div>
      <div className="mid part">
        <div className="searchIcon">
          <SearchOutlinedIcon className="icon" />
        </div>
        <input className="searchBar" placeholder="Search for anything"></input>
      </div>
      <div className="right part">
        {isauthenticated && (
          <div className="businessDiv" >
              <span className="business" onClick={function(){navigate("/mycourses")}}>My Learning</span>
            </div>
        )}
                  <div className="teachDiv">
            <span className="teach" onClick={function(){navigate("/login")}}>Teach on Udemy</span>
          </div>
        
        {/* <NavLink to={"/cart"}> */}
        <div className="cartDiv" onClick={function(){navigate("/cart")}}>
          <div className="cartDiv" >
            {" "}
            <ShoppingCartOutlinedIcon className="icon" />
          </div>
        </div>
        {/* </NavLink> */}
        {isauthenticated ? (
          <>
            
              <AccountCircleOutlinedIcon className="profile-icon" onClick={function(){navigate("/profile")}}/>
            
            <div className="signup button" onClick={logout}  style={{backgroundColor: "black", width:"100px", height:"50px", borderRadius:"0"}}>
              Logout
            </div>
          </>
        ) : (
          <>
            {/* <NavLink to="/login"> */}
              <div className="signup button" onClick={function(){navigate("/login")}} style={{backgroundColor: "black", width:"100px", height:"40px", borderRadius:"0"}} >Log In</div>
            {/* </NavLink> */}
            {/* <NavLink to={"/register"}> */}
              <div className="signup button" onClick={function(){navigate("/register")}} style={{backgroundColor: "black", width:"100px", height:"40px", borderRadius:"0"}}>Sign up</div>
            {/* </NavLink> */}
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderPrimary;
