// cleaned up imports

import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useDispatch, useSelector } from "react-redux"

import MainStack from "../MainStack"
import Login from "../../Auth/Login/Login"
import Signup from "../../Auth/Signup/Signup"
import ForgetPassword from "../../Auth/ForgetPassword/ForgetPassword"
import Loader from "../../utils/Loader"
import loaderAnimation from "../../../assets/Loaders"
import ConfirmEmail from "../../Auth/ForgetPassword/ConfirmEmail/ConfirmEmail"
import ConfirmOtp from "../../Auth/ForgetPassword/ConfirmOtp/ConfirmOtp"

import { LoginActions } from "../../redux/actions"

const RootNavigator = () => {
  const dispatch = useDispatch()
  const AuthData = useSelector((state) => state.authReducers.authState)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    (async function () {
      let user = await AsyncStorage?.getItem("CurrentAuth")
      let AsyncData = JSON.parse?.(user)
      if (AsyncData?.token) {
        setLoading(true)
        dispatch(LoginActions(AsyncData))
        setLoading(false)
      }
    })();
  }, []);
  
  const Stack = createStackNavigator()

  return loading ? (
    <>
      <Loader file={loaderAnimation} loading={loading} />
    </>
  ) : (
    <NavigationContainer>
      {AuthData?.rememberMe === true ? (
        <Stack.Navigator initialRouteName="MainStack" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      ) : (
        <>
          {!AuthData?.rememberMe && (
            <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
              <Stack.Screen name="ConfirmOtp" component={ConfirmOtp} />
              <Stack.Screen name="MainStack" component={MainStack} />
            </Stack.Navigator>
          )}
        </>
      )}
    </NavigationContainer>
  )
}

export default RootNavigator