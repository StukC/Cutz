import axios from "axios";
import Toast from "react-native-root-toast";
import { client } from "./client";
import { URLS } from "./Urls";
import { LoginActions } from "../redux/actions";
import { GetClientEvent, GetVolunteerEvent } from "./EventClientsApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-root-toast";

export const ClientSignup = async (
  data,
  setLoading,
  navigation,
  checkUser,
  dispatch
) => {
  const options = {
    method: "POST",
    url: `${URLS.BASE_URL}${URLS.CLIENT_SIGNUP}`,
    headers: { Accept: "application/json" },
    data: data,
  };

  console.log("OptionsData", options);

  setLoading(true);

  try {
    await axios
      .request(options)
      .then(async function (response) {
        console.log("userCreated", response.data?.token);
        if (response) {
          setLoading(false);
          Toast.show("Account is created successfully");
          const res = await GetClientEvent(response.data.token);
          const data = res?.data;
          data["token"] = response.data?.token;
          data["currentUser"] = checkUser;
          dispatch(LoginActions(data));
          setTimeout(() => {
            navigation.navigate("MainStack", {
              screen: "Welcome",
              params: { userType: checkUser },
              merge: true,
            });
          }, 1000);
          console.log("AccountCreates");
          //   return res
        } else {
          Toast.show("Account is already exist");

          console.log("AccountExist");
        }
      })
      .catch((error) => {
        setLoading(false);
        Toast.show("Account is already exist");
      });

    return res;
  } catch (error) {
    return error;
  }
};

export const VolunteerSignup = async (
  data,
  setLoading,
  navigation,
  checkUser,
  dispatch
) => {
  const options = {
    method: "POST",
    url: `${URLS.BASE_URL}${URLS.VOLUNTEER_SIGNUP}`,
    headers: { Accept: "application/json" },
    data: data,
  };

  setLoading(true);

  try {
    await axios
      .request(options)
      .then(async function (response) {
        console.log("userCreated", response.data);
        if (response) {
          setLoading(false);
          Toast.show("Account is created successfully");
          const res = await GetVolunteerEvent(response.data.token);
          const data = res?.data;
          data["token"] = response.data?.token;
          data["currentUser"] = checkUser;
          dispatch(LoginActions(data));
          setTimeout(() => {
            navigation.navigate("login", {checkUser:checkUser});
          }, 1000);

          console.log("AccountCreates");
          //   return res
        } else {
          Toast.show("Account is already exist");

          console.log("AccountExist");
        }
      })
      .catch((error) => {
        setLoading(false);
        Toast.show("Account is already exist");
      });
  } catch (error) {
    return error;
  }
};
export const ClientLogin = async (
  data,
  setLoading,
  navigation,
  checkUser,
  dispatch,
  remember
) => {
  const options = {
    method: "POST",
    url: `${URLS.BASE_URL}${URLS.CLIENT_LOGIN}`,
    headers: { Accept: "application/json" },
    data: data,
  };

  setLoading(true);

  try {
    await axios
      .request(options)
      .then(async function (response) {
        console.log("userCreated", response.data);
        if (response) {
          const res = await GetClientEvent(response.data.token);
          const data = res?.data;
          //  console.log("ResData",res?.data)
          if (remember) {
            const CurrentAuth = {
              token: response.data?.token,
              rememberMe: remember,
              currentUser: checkUser,
            };
            console.log("RememberAuth", CurrentAuth);
            await AsyncStorage.setItem(
              "CurrentAuth",
              JSON.stringify(CurrentAuth)
            );
          }
          data["token"] = response.data?.token;
          data["rememberMe"] = remember;
          data["currentUser"] = checkUser;
          dispatch(LoginActions(data));
          setLoading(false);

          Toast.show("Login successfully");

          setTimeout(() => {
            navigation.replace("MainStack", {
              screen: "Welcome",
              params: { userType: checkUser },
              merge: true,
            });
          }, 1000);
          console.log("AccountCreates");
          //   return res
        } else {
          Toast.show("error");

          console.log("AccountExist");
        }
      })
      .catch((error) => {
        setLoading(false);
        Toast.show("email or password is incorrect");
      });
  } catch (error) {
    return error;
  }
};

export const VolunteerLogin = async (
  data,
  setLoading,
  navigation,
  checkUser,
  dispatch,
  remember
) => {
  const options = {
    method: "POST",
    url: `${URLS.BASE_URL}${URLS.VOLUNTEER_LOGIN}`,
    headers: { Accept: "application/json" },
    data: data,
  };

  setLoading(true);

  try {
    await axios
      .request(options)
      .then(async function (response) {
        console.log("userCreated", response.data);
        if (response) {
          const res = await GetVolunteerEvent(response.data.token);
          const data = res?.data;
          //  console.log("ResData",res?.data)

          if (remember) {
            const CurrentAuth = {
              token: response.data?.token,
              rememberMe: remember,
              currentUser: checkUser,
            };
            console.log("RememberAuth", CurrentAuth);

            await AsyncStorage.setItem(
              "CurrentAuth",
              JSON.stringify(CurrentAuth)
            );
          }
          data["token"] = response.data?.token;
          data["rememberMe"] = remember;
          data["currentUser"] = checkUser;
          dispatch(LoginActions(data));
          setLoading(false);

          Toast.show("Login successfully");

          setTimeout(() => {
            navigation.replace("MainStack", {
              screen: "Welcome",
              params: { userType: checkUser },
              merge: true,
            });
          }, 1000);
          console.log("AccountCreates");
          //   return res
        } else {
          Toast.show("error");

          console.log("AccountExist");
        }
      })
      .catch((error) => {
        setLoading(false);
        Toast.show("email or password is incorrect");

        console.log("SignError=>", error);
      });
  } catch (error) {
    return error;
  }
};
