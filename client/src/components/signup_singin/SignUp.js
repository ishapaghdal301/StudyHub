import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [udata, setudata] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    setudata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { first_name,last_name, email, password,password2, role } = udata;

    // if(first_name === ""){
    //   toast.warn("please fill first name!",{
    //     position: "top-center"
    //   });
    // }
    const res = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,last_name, email,  password,password2, role
    }),
    });
    

    const data = await res.json();
    console.log(data);
    

    if (res.status === 400 || !data) {
      console.log(res.status);
      toast.warn("Please fill valid data", {
          position: "top-center"
      });
  } else {
      setudata({
          ...udata, first_name: "", last_name:"",email: "",
           password: "",password2: "", role: ""
      });
      toast.success("Registration Successfully done 😃!", {
          position: "top-center"
      });
    // console.log(data);
    navigate("/login")
  };
}

  return (
    <>
      <section>
        <div className="sign_container">
          {/* <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="signupimg" />
          </div> */}

          <div className="sign_form">
            <form method="POST">
              <h1>Sign-Up</h1>

              <div className="form_data">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  onChange={adddata}
                  value={udata.first_name}
                  name="first_name"
                  id="first_name"
                />
              </div>

              <div className="form_data">
                <label htmlFor="name">Your lastname</label>
                <input
                  type="text"
                  onChange={adddata}
                  value={udata.last_name}
                  name="last_name"
                  id="last_name"
                />
              </div>

              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={adddata}
                  value={udata.email}
                  name="email"
                  id="email"
                />
              </div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={adddata}
                  value={udata.password}
                  name="password"
                  id="password"
                />
              </div>

              <div className="form_data">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  onChange={adddata}
                  value={udata.password2}
                  name="password2"
                  id="password2"
                />
              </div>

              <div className="form_data">
                <label htmlFor="role">Role</label>
                <input
                  type="role"
                  onChange={adddata}
                  value={udata.role}
                  name="role"
                  id="role"
                />
              </div>

              <button
                type="submit"
                onClick={senddata}
                // onChange={adddata}
                value={udata.first_name}
                className="signin_btn"
              >
                Continue
              </button>

              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/login">Signin</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default SignUp;
