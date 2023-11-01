import loaderAnimation from "assets/Loaders";
import React from "react";
import Lottie from "react-lottie";

const Loader = ({ loading }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      style={{
        position: "absolute",
        marginLeft: "70vh",
        top: "30vh",
      }}
    >
      <Lottie
        style={{}}
        options={defaultOptions}
        height={100}
        width={100}
        isClickToPauseDisabled
      />
    </div>
  );
};

export default Loader;
