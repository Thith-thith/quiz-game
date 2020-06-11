import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import axios from "axios";
import ParticlesBg from "particles-bg";
import jwt from "jsonwebtoken";
import three_dots from "../assets/bars.svg";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import Message from "../components/Message/Message";
import Facebook from "../components/SocialLogin/FacbookLogin";
import successMessage from "../components/Message/SuccessMessage";
import SuccessMessage from "../components/Message/SuccessMessage";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);    

  const onSubmit = (data) => {
    fetch(" http://52.221.199.235:9000/login", {
      method: "POST",
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-type": "application/json",
      // },

      body: JSON.stringify({
        // user_name: data.Username,
        user_email: data.Email,
        user_password: data.Password,
      }),
    })
      // setMessage("File Upload")
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        localStorage.setItem("token", data.string);
        console.log("data", data.string);
        const decodeToken = jwt.decode(data.string);
        console.log(decodeToken);
        if (decodeToken) {
          setSucessMessage("Successfull");
          setTimeout(() => {
            setSucessMessage();
          }, 5000);
          window.location.replace("http://52.221.199.235:9000/profile");
        } else {
          setMessage("login failed");
          setTimeout(() => {
            setMessage();
          }, 5000);
        }
        // if (!data) {
        //   console.log(data);
        //   alert(data);
        // } else {
        //   window.location.replace("/start");
        //   console.log(data)
        // }
      })
      .catch((err) => {
        alert(err);
        // console.log(err.res.data);
      });
  };
  const responseFacebook = (response) => {
    console.log(response);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <React.Fragment>  
      {message ? <Message msg={message} /> : null}
      {successMessage ? <SuccessMessage msg={successMessage} /> : null}
      <div className="flex  items-center justify-center h-screen ">
        <ParticlesBg type="ball" bg={true} />
        <div className="w-full max-w-md">
          <form
            // style={{ backgroundColor: "rgb(250, 255, 255, 0.625)" }}
            className="blur bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
              Login
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 1 })}
                name="Email"
                type="email"
              />
              {errors.Username && (
                <p className="text-red-500 text-xs italic">
                  First Name required
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold  mb-2">
                Password
              </label>
              <input
                className=" appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 8 })}
                name="Password"
                type="password"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs italic">Password required</p>
              )}
            </div>
            {/* <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <span
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </span>
          </div> */}
            <span
              className="mb-4 cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </span>
            <button
              type="submit"
              className="focus:outline-none mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? (
                <img
                  className="justify-center mx-auto w-6 h-6"
                  src={three_dots}
                  alt="loading image"
                  // height="8"
                />
              ) : (
                "Sign In"
              )}
            </button>
            <p className="text-center text-gray-600 mb-2">Login With</p>
            <center>
              {/* <Facebook /> */}
              <FacebookLogin
                textButton=""
                cssClass="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
                appId="1095052497541475"
                autoLoad={true}
                fields="name,email,picture"
                icon="fa-facebook"
                // onClick={this.componentClicked}
                callback={responseFacebook}
              />
              <GoogleLogin
                className="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
                clientId="1001069899717-m5ivlhe573nv3hlkupraml1g385s5kd3.apps.googleusercontent.com"
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              ,
            </center>

            <p className="text-center text-gray-600 mb-4">
              Don't hava an account yet?
            </p>
            {/* <span className="text-blue-500">
            <Link to="/register">register now</Link>
          </span> */}
            <Link to="/register">
              <button
                type="submit"
                className="focus:outline-none mb-6 w-full border text-blue-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create account
              </button>
            </Link>

            <p className="text-center text-gray-600 ">Terms and conditions</p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
