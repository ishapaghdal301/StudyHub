import React, { useState, useEffect } from "react";
import "./signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isauthenticated, setIsauthenticated] = useState(false);

  useEffect(() => {
    // This effect will run whenever isauthenticated changes
    if (isauthenticated) {
      console.log("Authenticated");
      toast.success("User Valid!", {
        position: "top-center",
      });
      setData({ ...logdata, email: "", password: "" });
    } else {
      console.log(isauthenticated + "400");
      toast.warn("Invalid Details !", {
        position: "top-center",
      });
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

  const senddata = async (e) => {
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
    console.log(data.user.role);
    const role = data.user.role;

    if (res.status === 400 || !data) {
      setIsauthenticated(false);
      console.log(isauthenticated);
    } 
    else {
      setIsauthenticated(true);
      console.log(isauthenticated);

      console.log(data.user._id);
      if (role === "student") {
        navigate("/", { state: { data: data } });
      }
      else {
        navigate("/teacherhome", { state: { mdata: data } });

      }
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          {/* <div className="sign_header">
            <img src="./studyhub.jfif" alt="signupimg" />
          </div> */}

          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>

              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={adddata}
                  value={logdata.email}
                  name="email"
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={adddata}
                  value={logdata.password}
                  id="password"
                  placeholder="At least 6 characters"
                />
              </div>

              <NavLink>
                <button type="submit" onClick={senddata} className="signin_btn">
                  Continue
                </button>
              </NavLink>
            </form>
          </div>

          <div className="create_accountinfo">
            <p>New to StudyHub?</p>
            <NavLink to="/register">
              <button> Create your Account</button>
            </NavLink>
            {isauthenticated && <NavLink to="/">Go to Home</NavLink>}
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Sign_in;
