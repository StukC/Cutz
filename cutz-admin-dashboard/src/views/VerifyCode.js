import React, { useState } from "react";
import loginpagelogo from "../assets/img/imges/image_2023-01-19_224110357 2.png";
import { useNavigate, useParams } from "react-router-dom";
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

function VerifyCodePage() {
  const navigate = useNavigate();
  const { email } = useParams();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState({
    code: "",
  });

  const verifyOtp = async () => {
    await axios
      .post(Urls.BaseUrl + "api/v1/forgetpasswordadmin/verifyotp", {
        email: email,
        otp: code,
      })
      .then((result) => {
        if (result.data.message === "Otp matched successfully") {
          alert("Otp Verified");
          navigate(`/reset-password/${email}`);
        } else {
          alert(result.data.message);
        }
      })
      .catch((error) => {
        alert(error);
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
            placeholder="otp code"
            type="text"
            onChange={(e) => setCode(e.target.value)}
            onKeyUp={() => setError({ ...error, code: "" })}
          />
          <p style={{ color: "red" }}>{error.code}</p>
          <a className="send-otp" onClick={verifyOtp}>
            Verify
          </a>
        </div>
      </div>
    </>
  );
}

export default VerifyCodePage;
