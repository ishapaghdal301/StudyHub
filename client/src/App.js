import React,{useState} from "react";
import "./App.css";
import Header from "./components/Header";
import HomeContent from "./components/HomeContent";
import HomeFooter from "./components/HomeFooter";
import { Routes, Route, useLocation } from "react-router-dom";
import Sign_in from "./components/signup_singin/Sign_in";
import SignUp from "./components/signup_singin/SignUp";
import TeacherHome from "./components/teacherHome/teacherHome";
import Cart from "./components/homeContent/Cart/Cart";


function App() {
  
  return (
    
    <div className="App">
      <Routes>
      
        <Route path="/" element= {<Home />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/teacherhome/*" element= {<TeacherHome />} />
        {/* <Route path="/cart" element={<Cart />} /> */}

      </Routes>
    </div>
  );
}

function Home(){
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
      <HomeContent id = {_id} showCart = {showCart}/>
      <HomeFooter/>
    </>
  )
}


export default App;
