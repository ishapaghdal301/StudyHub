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


function App() {
  
  return (
    
    <div className="App">
    <ToastContainer
        position="top-center" // Set the default position for all toasts
        autoClose={5000} // Auto close after 5 seconds (you can adjust this)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/mycourses" element= {<Mycourse/>} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/teacherhome/*" element= {<TeacherHome />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/profile" element={ <MyUserProfile/>}/>


      </Routes>
    </div>
  );
}

function MyUserProfile(){
  const [showCart, setShowCart] = useState(false); 
  const OnChangeShowCart = (showCart) => {
    setShowCart(showCart);
  };
  const location = useLocation();
  const state = location.state ? location.state.data : null;
  const _id = state ? state._id : null;

  return(
    <>
      <Header id = {_id} OnChangeShowCart = {OnChangeShowCart}/>
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
  const [showCart, setShowCart] = useState(false); 
  const OnChangeShowCart = (showCart) => {
    setShowCart(showCart);
  };
  const location = useLocation();
  const state = location.state ? location.state.data : null;
  const _id = state ? state._id : null;

  return(
    <>
      <Header id = {_id} OnChangeShowCart = {OnChangeShowCart}/>
      <MyCourse id = {_id} showCart = {showCart}/>
      <HomeFooter/>
    </>
  )
}

function MyCart(){
  const [showCart, setShowCart] = useState(false); 
  const OnChangeShowCart = (showCart) => {
    setShowCart(showCart);
  };
  const location = useLocation();
  const state = location.state ? location.state.data : null;
  const _id = state ? state._id : null;
  return(
    <>
      <Header id = {_id} OnChangeShowCart = {OnChangeShowCart}/>
      <Cart id = {_id} />
      <HomeFooter/>
    </>
  )
}


export default App;
