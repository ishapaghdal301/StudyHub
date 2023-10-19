import React,{useState} from "react";
import "./App.css";
import Header from "./components/Header";
import HomeContent from "./components/HomeContent";
import MyCourse from "./components/mycouse/Mycourse";
import HomeFooter from "./components/HomeFooter";
import { Routes, Route, useLocation } from "react-router-dom";
import Sign_in from "./components/signup_singin/Sign_in";
import SignUp from "./components/signup_singin/SignUp";
import TeacherHome from "./components/teacherHome/teacherHome";
import Cart from "./components/homeContent/Cart/Cart";
import UserProfile from "./components/homeContent/UserProfile/UserProfile";
import { ToastContainer } from "react-toastify";
import ShowCategories from "./components/homeContent/ShowCategories/ShowCategories";
import TopCategories from "./components/homeContent/topCategories/topCategories";


function App() {
  const user = localStorage.getItem("user");
  
  return (
    
    <div className="App">
    <ToastContainer
        position="top-center" // Set the default position for all toasts
        autoClose={1000} // Auto close after 5 seconds (you can adjust this)
        hideProgressBar={true}
      />
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/mycourses" element= {<Mycourse/>} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/teacherhome/*" element= {<TeacherHome />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/profile" element={ <MyUserProfile/>}/>
        <Route path="/categories" element={ <ShowMyCategories/>}/>
      </Routes>
    </div>
  );
}

function ShowMyCategories(){
  return(
    <>
      <Header/>
      <ShowCategories></ShowCategories>
      <HomeFooter/>

    </>
  )
}
function MyUserProfile(){
  return(
    <>
      <Header/>
      <UserProfile/>
      <HomeFooter/>
    </>
  )
}

function Home(){
  

  return(
    <>
      <Header />
      <HomeContent />
      <HomeFooter/>
    </>
  )
}

function Mycourse(){
  const _id = localStorage.getItem("user");
  return(
    <>
      <Header/>
      <MyCourse />
      <HomeFooter/>
    </>
  )
}

function MyCart(){
  return(
    <>
      <Header/>
      <Cart/>
      <HomeFooter/>
    </>
  )
}


export default App;