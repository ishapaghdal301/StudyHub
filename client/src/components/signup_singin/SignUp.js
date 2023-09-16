import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUp() {
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
  const submit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, password2, role } = udata;


    const res = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name, last_name, email, password, password2, role
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
        ...udata, first_name: "", last_name: "", email: "",
        password: "", password2: "", role: ""
      });
      toast.success("Registration Successfully done 😃!", {
        position: "top-center"
      });
      // console.log(data);
      navigate("/login")
    };
  }

  return (
    <div className="App">
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>

                    <form method="POST">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="first_name"
                          placeholder="name@example.com"
                          value={udata.first_name}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingInput">First Name</label>

                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="last_name"
                          placeholder="name@example.com"
                          value={udata.last_name}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingInput">Last Name</label>

                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          name="email"
                          placeholder="name@example.com"
                          value={udata.email}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingInput">Email address</label>

                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          value={udata.password}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingPassword">Password</label>

                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          name="password2"
                          placeholder="Password"
                          value={udata.password2}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingPassword">Confirm Password</label>

                      </div>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="role"
                          name="role"
                          value={udata.role}
                          onChange={adddata}
                        >
                          <option value="">Select Role</option>
                          <option value="teacher">teacher</option>
                          <option value="student">student</option>
                        </select>
                        <label htmlFor="role">Role</label>
                      </div>
                      <NavLink>
                        <div className="d-grid">
                          <button
                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                            type="submit"
                            onClick={submit}>
                            Sign in
                          </button>
                        </div>
                      </NavLink>
                    </form>

                    <div className="d-grid">
                      <div className="text-center">
                        <p>Already have an account?</p>
                        <NavLink to="/login">
                          <button className="create-account-btn">Login to your Account</button>
                        </NavLink>

                        {/* {isauthenticated && <NavLink to="/">Go to Home</NavLink>} */}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SignUp;
