import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function CustomFormValidation() {

  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isauthenticated, setIsauthenticated] = useState(
    localStorage.getItem('isauthenticated') === 'true'
  );

  useEffect(() => {
    // This effect will run whenever isauthenticated changes
    if (isauthenticated) {
      console.log("Authenticated");
      toast.success("User Valid!", {
        position: "top-center",
      });
      setData({ ...logdata, email: "", password: "" });
      localStorage.setItem("isauthenticated", isauthenticated);
    } else {
      console.log(isauthenticated + "400");
      toast.warn("Invalid Details !", {
        position: "top-center",
      });
      localStorage.setItem("isauthenticated", isauthenticated);
    }
  }, [isauthenticated]);

  const adddata = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;

    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    const user = data.user;
    console.log(user);
    if (user) {
      localStorage.setItem("user", user._id);
      console.log(user.role);
      const role = user.role;
      setIsauthenticated(true);
      if (role === "student") {
        navigate("/", { state: { data: data } });
      }
      else {
        navigate("/teacherhome", { state: { mdata: data } });

      }
    }
    if (res.status === 400 || !data) {
      setIsauthenticated(false);
      console.log(isauthenticated);
    } else {
      setIsauthenticated(true);
      // console.log(isauthenticated);

      // console.log(data.user._id);
      // 
    }
  };

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
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          name="email"
                          placeholder="name@example.com"
                          value={logdata.email}
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
                          value={logdata.password}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingPassword">Password</label>

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
                        <p>New to StudyHub?</p>
                        <NavLink to="/register">
                          <button className="create-account-btn">Create your Account</button>
                        </NavLink>

                        {isauthenticated && <NavLink to="/">Go to Home</NavLink>}
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

export default CustomFormValidation;
