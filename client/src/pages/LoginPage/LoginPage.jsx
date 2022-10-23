import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";

export const LoginPage = () => {
  const [loader, setLoader] = useState(false);

  const [values, setValues] = useState({
    username: "ujwal",
    password: "ujwal@gmail.com",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = (e) => {
    setLoader(true);
    const { username, password } = values;
    if (username === "") {
      setLoader(false);
      toast.error("Username and Password is required", toastOptions);
      return false;
    } else if (password === "") {
      setLoader(false);
      toast.error("Username and Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        setLoader(false);
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.usernameCheck)
        );
        navigate("/");
      }
    }
  };

  return (
    <div className="loginpage">
      <div className="wrapper">
        <div className="inner">
          <form action="" onSubmit={handleSubmit}>
            <h3>LOG IN</h3>

            <div className="form-row">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
                defaultValue="ujwal"
                className="form-control"
              />
            </div>
            <div className="form-row">
              <div className="form-wrapper">
                <div className="form-wrapper">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    defaultValue="ujwal@gmail.com"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="login-btn-l">
              {loader ? (
                <button type="submit" className="loader-btn">
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              ) : (
                <button data-text="Log in">
                  <span>Log in</span>
                </button>
              )}
            </div>
            <p>Don't have an account ?</p>
            <Link className="button" to="/signup">
              <div className="signup-btn-l">
                <button data-text="Create Account">
                  <span>Create Account</span>
                </button>
              </div>
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
