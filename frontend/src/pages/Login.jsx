import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("support-chat-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, email } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem("support-chat-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password === "") {
      toast.error("Email and password required", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email and password required", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1 style={{ color: "#ffffff" }}>Branch Agent Portal</h1>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" style={{ color: "black" }}>
            Login
          </button>
          {/* <div className="links"> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              gap: "4px",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#ffffff" }}>
              New Agent?
              <Link to="/register" style={{ color: "#eab308" }}>
                {" "}
                Click Here
              </Link>
            </span>
            <span style={{ color: "white" }}>|</span>
            <span style={{ color: "#ffffff" }}>
              Ask a query?
              <Link to="/request" style={{ color: "#eab308" }}>
                {" "}
                Click Here
              </Link>
            </span>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #18181b;

  .brand {
    color: black;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h1 {
      color: #fefffe;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #3f3f46;
    border-radius: 0.5rem;
    padding: 3rem 3rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #fefffe;
      border-radius: 0.4rem;
      color: #fefffe;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid white;
        outline: none;
      }
    }
    button {
      background-color: #eab308;
      color: black;
      padding: 1rem 2rem;
      border: none;
      font-weight: none;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #ca8a04;
      }
    }
    .links {
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      width: 100%;
      span {
        color: #fefffe;
        a {
          color: #4eccff;
          text-decoration: none;
        }
      }
    }
  }
`;
//Color codes: light blue- #4ECCFF, dark blue- #19345F, white- #FEFFFE, black- #333333
export default Login;
