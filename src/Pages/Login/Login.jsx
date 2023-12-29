import { useState } from "react";
import "./Login.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPasswrd] = useState("");

  const apiLogin = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/v1/api/login",
        data: {
          email: email,
          password: password,
        },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    toast
      .promise(
        apiLogin(),
        {
          loading: "Logging...",
          success: "Login Successfull.",
          error: (error) => {
            toast.error(`login Failed: ${error}`);
          },
        },
        {
          style: {
            minWidth: "250px",
            backgroundColor: "black",
            color: "white",
          },
          success: {
            duration: 5000,
            icon: "🚀",
          },
        }
      )
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
  };

  return (
    <div className="animated bounceInDown">
      <div className="containercustom">
        <Toaster />
        <span className="error animated tada" id="msg"></span>
        <form name="form1" className="box">
          <h4 className="mb-3">
            IPanGram <span>Dashboard</span>
          </h4>
          <h5>Sign in to your account.</h5>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <i className="typcn typcn-eye" id="eye"></i>
          <input
            type="password"
            name="password"
            placeholder="Passsword"
            id="pwd"
            onChange={(e) => {
              setPasswrd(e.target.value);
            }}
          />

          <a href="#" className="forgetpass">
            Forget Password?
          </a>
          <input
            type="submit"
            value="Sign in"
            className="btn1"
            onClick={(e) => {
              handleLogin(e);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
