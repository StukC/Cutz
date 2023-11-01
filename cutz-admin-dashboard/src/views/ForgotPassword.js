import React, { useState } from "react";
import loginpagelogo from "../assets/img/imges/image_2023-01-19_224110357 2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Urls } from "utilities/Urls";
import Lottie from "react-lottie";
import loaderAnimation from "assets/Loaders";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    email: "",
  });

  const sendOtp = async () => {
    setLoading(true);
    await axios
      .post(Urls.BaseUrl + "api/v1/forgetpasswordadmin/sendotp", {
        email: email,
      })
      .then((result) => {
        if (result.data.message === "OTP sent successfully") {
          alert("Otp sent");
          navigate(`/verify-code/${email}`);
          setLoading(false);
        } else {
          alert(result.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        alert(error);

        setLoading(false);
      });
  };

  return (
    <>
      <div
        className="container_fluied d-flex justify-content-between align-items-center"
        style={{ position: "relative", padding: "7px" }}
      >
        <div>
          <img width={200} src={loginpagelogo} alt="" />
        </div>
        <div>
          <h1>Admin</h1>
        </div>
      </div>
      <div className="line"></div>

      <div className="mt-2 d-flex justify-content-center mainstyle">
        <div className="loginhearder">
          <h2 className="headlogin"> Forgot Password</h2>

          <input
            className="d-flex in1"
            placeholder="email"
            type="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={() => setError({ ...error, email: "" })}
          />
          <p style={{ color: "red" }}>{error.email}</p>
          <a className="send-otp" onClick={sendOtp}>
            Send OTP{" "}
          </a>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
