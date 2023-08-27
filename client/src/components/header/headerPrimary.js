import React from "react";
import './headerPrimary.css';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

function HeaderPrimary(props) {
    return (
        <div className="headerPrimary">
            <div className="left part">
                <div className="udemyLogo">
                    <img src="./studyhub.jfif" className="logo" alt="logo"></img>
                </div>
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
                <div className="businessDiv">
                    <span className="business">Udemy for Business</span>
                </div>
                <div className="teachDiv">
                    <span className="teach">Teach on Udemy</span>
                </div>
                <div className="cartDiv">
                    <ShoppingCartOutlinedIcon className="icon" />
                </div>
                {props.id !== null ? (
                    // User is logged in, show profile button
                    <AccountCircleOutlinedIcon className="profile-icon" />
                ) : (
                    // User is not logged in, show login and signup buttons
                    <>
                        <NavLink to="/login"><div className="login button">Log In</div></NavLink>
                        <NavLink to={"/register"}><div className="signup button">Sign up</div></NavLink>
                    </>
                )}
                
            </div>
        </div >)
}

export default HeaderPrimary;