import React, { useState } from "react";
import "./headerPrimary.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Link, NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

function HeaderPrimary() {
  const [showCart, setShowCart] = useState(false);
  const [isauthenticated, setIsauthenticated] = useState(
    localStorage.getItem("isauthenticated") === "true"
  );

  const logout = () => {
    localStorage.setItem("isauthenticated", false);
    setIsauthenticated(false);
    localStorage.removeItem("user");
  };

  

  return (
    <div className="headerPrimary">
      <div className="left part">
        <NavLink to={"/"}>
          <div className="udemyLogo">
            <img src="./studyhub.jfif" className="logo" alt="logo"></img>
          </div>
        </NavLink>
        <div className="categoriesDiv">
          <span className="categories">Categories</span>
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
          <NavLink to="/mycourses">
            <div className="businessDiv">
              <span className="business">My Learning</span>
            </div>
          </NavLink>
        )}
        <NavLink to="/login">
          <div className="teachDiv">
            <span className="teach">Teach on Udemy</span>
          </div>
        </NavLink>
        <NavLink to={"/cart"}>
        <div className="cartDiv">
          <div className="cartDiv" >
            {" "}
            <ShoppingCartOutlinedIcon className="icon" />
          </div>
        </div>
        </NavLink>
        {isauthenticated ? (
          <>
            <NavLink to="/profile"> {/* Add NavLink to profile */}
              <AccountCircleOutlinedIcon className="profile-icon" />
            </NavLink>
            <div className="signup button" onClick={logout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <div className="signup button">Log In</div>
            </NavLink>
            <NavLink to={"/register"}>
              <div className="signup button">Sign up</div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderPrimary;
