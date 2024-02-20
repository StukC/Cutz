import axios from "axios";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URLS } from "./Urls";
import { LoginActions } from "../redux/actions";



// User login for clients and volunteers
export const UserLogin = async (
  data,
  setLoading,
  navigation,
  checkUser,
  dispatch,
  remember
) => {

  const userURL = (checkUser == 'Client' ? 
    `${URLS.BASE_URL}${URLS.CLIENT_LOGIN}` :
    `${URLS.BASE_URL}${URLS.VOLUNTEER_LOGIN}`
  )

  const options = {
    method: "POST",
    url: userURL,
    headers: { Accept: "application/json" },
    data: {
      ...data,
      email: data.email.toLowerCase(),
    },
  };

  setLoading(true);

  try {
    await axios
      .request(options)
      .then(async function (response) {
        if (response) {
          if (remember) {
            let CurrentAuth = {
              token: response.data?.token,
              rememberMe: remember,
              currentUser: checkUser,
            };
            CurrentAuth={...CurrentAuth,...response.data?.userDetails}
            await AsyncStorage.setItem("CurrentAuth", JSON.stringify(CurrentAuth));
          }
          data["token"] = response.data?.token;
          data["rememberMe"] = remember;
          data["currentUser"] = checkUser;
          data={...data, ...response.data?.userDetails}
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
        } else {
          Toast.show("error");
        }
      })
      .catch((error) => {
        Toast.show("Email or password is incorrect");
      });
  } catch (error) {
      return error;
  }
};


// User signup for clients and volunteers
// Email check is case-insensitive
export const UserSignup = async (
  data,
  setLoading,
  navigation,
  checkUser,
  dispatch
) => {

  const userURL = (checkUser == 'Client' ? 
    `${URLS.BASE_URL}${URLS.CLIENT_SIGNUP}` :
    `${URLS.BASE_URL}${URLS.VOLUNTEER_SIGNUP}`
  )
  const options = {
    method: "POST",
    url: userURL,
    headers: { Accept: "application/json" },
    data: {
      ...data,
      email: data.email.toLowerCase(),
    },
  };

  setLoading(true);

  try {
    await axios
      .request(options)
      .then(async function (response) {
        if (response) {
          data={...data,...response.data?.userDetails}
          data["token"] = response.data?.token;
          data["currentUser"] = checkUser;
          dispatch(LoginActions(data));
          setLoading(false);
          Toast.show("Account created successfully");
          setTimeout(() => {
            navigation.navigate("login", {checkUser:checkUser});
          }, 1000);

          //   return res
        } else {
          Toast.show("Account already exists");
        }
      })
      .catch((error) => {
        setLoading(false);
        Toast.show("Account already exists");
      });

    //return res;
  } 
  catch (error) {
    return error;
  }
};