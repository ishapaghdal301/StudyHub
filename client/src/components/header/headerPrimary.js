import React, { useState } from "react";
import './headerPrimary.css';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Link, NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

function HeaderPrimary(props) {

    const [isauthenticated, setIsauthenticated] = useState(localStorage.getItem('isauthenticated') === 'true');

    const logout = () => {
        localStorage.setItem("isauthenticated", false);
        setIsauthenticated(false);
    };

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
                    <Link to="/cart"> {/* Use Link to navigate to the Cart component */}
                        <ShoppingCartOutlinedIcon className="icon" />
                    </Link>
                </div>
                {isauthenticated ? (
                    <>
                        <AccountCircleOutlinedIcon className="profile-icon" />
                        <div className="signup button" onClick={logout}>Logout</div>
                    </>
                ) : (

                    <>
                        <NavLink to="/login"><div className="signup button">Log In</div></NavLink>
                        <NavLink to={"/register"}><div className="signup button">Sign up</div></NavLink>
                    </>
                )}

            </div>
        </div >)
}

export default HeaderPrimary;