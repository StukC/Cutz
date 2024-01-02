import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "../AuthStack/AuthStack";
import MainStack from "../MainStack";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GetClientEvent,
  GetVolunteerEvent,
} from "../../services/EventClientsApi";
import { LoginActions } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Login from "../../Auth/Login/Login";
import Signup from "../../Auth/Signup/Signup";
import ForgetPassword from "../../Auth/ForgetPassword/ForgetPassword";
import Loader from "../../utils/Loader";
import loaderAnimation from "../../../assets/Loaders";
import ConfirmEmail from "../../Auth/ForgetPassword/ConfirmEmail/ConfirmEmail";
import ConfirmOtp from "../../Auth/ForgetPassword/ConfirmOtp/ConfirmOtp";

const RootNavigator = () => {
  const dispatch = useDispatch();
  const AuthData = useSelector((state) => state.authReducers.authState);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async function () {
      let user = await AsyncStorage?.getItem("CurrentAuth");
      let AsyncData = JSON.parse?.(user);
      if (AsyncData?.token) {
        setLoading(true);
        dispatch(LoginActions(AsyncData));
        setLoading(false);
      }
    })();
  }, []);
  
  const Stack = createStackNavigator();

  return loading ? (
    <>
      <Loader file={loaderAnimation} loading={loading} />
    </>
  ) : (
    <NavigationContainer>

      {AuthData?.rememberMe === true ? (
        <Stack.Navigator
          initialRouteName="MainStack"
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}

          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />

          {/* <Stack.Screen name="Reservation" component={MakeReservation} /> */}
        </Stack.Navigator>
      ) : (
        <>
          {!AuthData?.rememberMe && (
            <Stack.Navigator
              initialRouteName="login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
              <Stack.Screen name="ConfirmOtp" component={ConfirmOtp} />


              <Stack.Screen name="MainStack" component={MainStack} />

              {/* <Stack.Screen name="Reservation" component={MakeReservation} /> */}
            </Stack.Navigator>
          )}
        </>
      )}

    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
