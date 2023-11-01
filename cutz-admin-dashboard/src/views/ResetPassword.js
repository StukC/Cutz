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

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { email } = useParams();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, settConfirmPassword] = useState("");
  const [error, setError] = useState({
    password: "",
    confirmPassword,
  });

  const resetPassword = async () => {
    setLoading(true);
    await axios
      .post(Urls.BaseUrl + "api/v1/forgetpasswordadmin/resetpass", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((result) => {
        if (result.data.status === "OK") {
          alert("Password reset successfully");
          navigate("/");
          setLoading(false);
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
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={() => setError({ ...error, password: "" })}
          />
          <input
            className="d-flex in2"
            placeholder="confirm password"
            type="password"
            onChange={(e) => settConfirmPassword(e.target.value)}
            onKeyUp={() => setError({ ...error, confirmPassword: "" })}
          />
          <p style={{ color: "red" }}>{error.code}</p>
          <a className="reset-password" onClick={resetPassword}>
            Reset
          </a>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
