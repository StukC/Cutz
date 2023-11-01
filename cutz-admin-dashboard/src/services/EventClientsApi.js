import axios from "axios";
import Toast from "react-native-root-toast";
import { LoginActions } from "../redux/actions";
import { URLS } from "./Urls";

export const GetClientEvent = async (token) => {
  console.log("ClietnToken", token);
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.GET_CLIENT}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {}
};

export const GetVolunteerEvent = async (token) => {
  console.log("ClietnToken", token);
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.GET_VOLUNTEER}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {}
};
export const GetEvent = async () => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.GET_EVENTS}`, {
      headers: {
        Accept: "application/json",
      },
    });
    z;
  } catch (error) {}
};

export const UpdateVolunteerEvent = async (
  token,
  data,
  AuthUser,
  dispatch,
  setLoading
) => {
  const options = {
    method: "PATCH",
    url: `${URLS.BASE_URL}${URLS.GET_VOLUNTEER}`,
    headers: { Authorization: "Bearer " + token },
    data: data,
  };
  setLoading(true);

  try {
    await axios
      .request(options)
      .then(async function (response) {
        console.log("userCreated", response?.message);
        if (response) {
          // setLoading(false);
          const res = await GetVolunteerEvent(token);
          const data = res?.data;
          data["token"] = token;
          data["currentUser"] = AuthUser.currentUser;
          setLoading(false);

          Toast.show("Profile is updated");
          console.log("UpdatedData", JSON.stringify(data, null, 2));

          dispatch(LoginActions(data));
          //   return res
        } else {
          Toast.show("something wrong");
          setLoading(false);

          console.log("AccountExist");
        }
      })
      .catch((error) => {
        setLoading(false);
        // Toast.show("Account is already exist");
      });

    return res;
  } catch (error) {
    return error;
  }
};

export const DeleteVolunteerEvent = async (token) => {
  try {
    return await axios.delete(`${URLS.BASE_URL}${URLS.GET_VOLUNTEER}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {}
};

export const UpdateClientEvent = async (
  token,
  data,
  AuthUser,
  dispatch,
  setLoading
) => {
  console.log("TokenData", token);
  const options = {
    method: "PATCH",
    url: `${URLS.BASE_URL}${URLS.GET_CLIENT}`,
    headers: { Authorization: "Bearer " + token },
    data: data,
  };

  try {
    await axios
      .request(options)
      .then(async function (response) {
        // console.log("userCreated", response?.message);
        if (response) {
          const res = await GetClientEvent(token);
          const data = res?.data;
          data["token"] = token;
          data["currentUser"] = AuthUser.currentUser;
          Toast.show("Profile is updated");
          console.log("UpdatedData", JSON.stringify(data, null, 2));
          setLoading(false);

          dispatch(LoginActions(data));
          //   return res
        } else {
          setLoading(false);

          Toast.show("something wrong");

          console.log("AccountExist");
        }
      })
      .catch((error) => {
        setLoading(false);
        // Toast.show("Account is already exist");
      });

    return res;
  } catch (error) {
    return error;
  }
};

export const ClientForgetPassword = async (
  data,
  setLoading,
  navigation,
  checkUser,
  email
) => {
  console.log("EmailData", email);
  axios
    .post(
      `${URLS.BASE_URL}${URLS.CLIENT_FORGET_PASSWORD}`,

      // "https://event-app-production-production.up.railway.app/api/v1/forgetpasswordclient/resetpass",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response?.data?.message == "Password Updated Successfully") {
        setLoading(false);
        Toast.show("Password Updated Successfully");

        navigation.navigate("login", {
          checkUser: checkUser,
        });
      } else {
        setLoading(false);
        Toast.show("Client not exist with this email ", email);
      }
    })

    .catch(function (error) {
      setLoading(false);
      Toast.show("Client not exist with this email ", email);
    });
};
export const VolunteerForgetPassword = async (
  data,
  setLoading,
  navigation,
  checkUser,
  email
) => {
  console.log("EmailData", email);
  axios
    .post(
      `${URLS.BASE_URL}${URLS.VOLUNTEER_FORGET_PASSWORD}`,

      // "https://event-app-production-production.up.railway.app/api/v1/forgetpasswordvolunteer/resetpass",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response?.data?.message == "Password Updated Successfully") {
        setLoading(false);
        Toast.show("Password Updated Successfully");

        navigation.navigate("login", {
          checkUser: checkUser,
        });
      } else {
        setLoading(false);
        Toast.show("Volunteer not exist with this email ", email);
      }
    })

    .catch(function (error) {
      setLoading(false);
      Toast.show("No volunteer with email ", email);
    });
};

export const VolunteerSendOtp = async (
  data,
  setLoading,
  navigation,
  checkUser,
  email
) => {
  console.log("EmailData", email);
  axios
    .post(
      `${URLS.BASE_URL}${URLS.CHECK_VOLUNTEER_EMAIL}`,

      // "https://event-app-production-production.up.railway.app/api/v1/forgetpasswordvolunteer/sendotp",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response?.data?.message == "OTP sent successfully") {
        setLoading(false);
        Toast.show("OTP sent successfully");

        navigation.navigate("ConfirmOtp", {
          checkUser: checkUser,
          email: email,
        });
      } else {
        setLoading(false);
        Toast.show("Volunteer not exist with this email ",);
      }

      // console.log(response?.data?.message);
    })

    .catch(function (error) {
      setLoading(false);
      Toast.show("Volunteer not exist with this email ", email);
    });
};

// console.log("DataJson",JSON.stringify(data))
// const options = {
//   method: "POST",
//   url: 'https://event-app-production-production.up.railway.app/api/v1/forgetpasswordvolunteer/sendotp',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },    body:  JSON.stringify(data),
// };
// try {
//   return await axios.request(options);
// } catch (error) {}

export const ClientSendOtp = async (
  data,
  setLoading,
  navigation,
  checkUser,
  email
) => {
  console.log("EmailData", email);
  axios
    .post(
      `${URLS.BASE_URL}${URLS.CHECK_CLIENT_EMAIL}`,

      // "https://event-app-production-production.up.railway.app/api/v1/forgetpasswordclient/sendotp",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response?.data?.message == "OTP sent successfully") {
        setLoading(false);
        Toast.show("OTP sent successfully");

        navigation.navigate("ConfirmOtp", {
          checkUser: checkUser,
          email: email,
        });
      } else {
        setLoading(false);
        Toast.show("Client not exist with this email ", email);
      }

      console.log(response?.data?.message);
    })

    .catch(function (error) {
      setLoading(false);
      Toast.show("Client not exist with this email ", email);
    });
};

export const VolunteerOtpVerified = async (
  data,
  setLoading,
  navigation,
  checkUser,
  email
) => {
  console.log("EmailData", email);
  axios
    .post(
      `${URLS.BASE_URL}${URLS.VOLUNTEER_OTP_VERIFIED}`,

      // "https://event-app-production-production.up.railway.app/api/v1/forgetpasswordvolunteer/verifyotp",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response?.data?.message == "Otp matched successfully") {
        setLoading(false);
        Toast.show("Otp matched successfully");

        navigation.navigate("ForgetPassword", {
          checkUser: checkUser,
          email: email,
        });
      } else {
        setLoading(false);
        Toast.show("Please enter valid otp");
      }
    })

    .catch(function (error) {
      setLoading(false);
      Toast.show("Please enter valid otp");
    });
};

export const ClientOtpVerified = async (
  data,
  setLoading,
  navigation,
  checkUser,
  email
) => {
  console.log("EmailData", email);
  axios
    .post(
      `${URLS.BASE_URL}${URLS.CLIENT_OTP_VERIFIED}`,
      // "https://event-app-production-production.up.railway.app/api/v1/forgetpasswordclient/verifyotp",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response?.data?.message == "Otp matched successfully") {
        setLoading(false);
        Toast.show("Otp matched successfully");

        navigation.navigate("ForgetPassword", {
          checkUser: checkUser,
          email: email,
        });
      } else {
        setLoading(false);
        Toast.show("Please enter valid otp");
      }
    })

    .catch(function (error) {
      setLoading(false);
      Toast.show("Please enter valid otp");
    });
};

export const DeleteClientEvent = async (token) => {
  try {
    return await axios.delete(`${URLS.BASE_URL}${URLS.GET_CLIENT}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {}
};
