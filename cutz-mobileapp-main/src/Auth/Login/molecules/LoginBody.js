// cleaned up imports

import React, { useState } from "react"
import { View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { verticalScale } from "react-native-size-matters"
import { useDispatch } from "react-redux"

import { UserLogin } from "../../../services/LoginSignupApi"
import LoginBottom from "./LoginBottom"
import { useLogin } from "../useLogin"
import CustomTextInput from "../../../components/CustomTextInput"
import { Spacer } from "../../../components/Spacer"
import CustomButton from "../../../components/CustomButton"
import { colors } from "../../../utils/Colors"
import { icons } from "../../../../assets/icons"

const LoginBody = ({ user, checkUser, setCheckUser, navigation }) => {

  const checkUserData = ["Client", "Volunteer"]
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [passwordError, setPasswordError] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        setEmail("")
        setPassword("")
        setCheckUser("Client")
        setShowPassword(true)
        setPasswordError("")
        setEmailError("")
        setRemember(false)
      }
    }, [])
  )

  // Simplified the code below
  const onSubmitLogin = async () => {

    const validateResponse = useLogin(email, setEmailError, password, setPasswordError)
    const loginData = { email: email, password: password }
    if (validateResponse) {
      await UserLogin(loginData, setLoading, navigation, checkUser, dispatch, remember)
    }
  }

  return (
    <>
      <View style={{ paddingHorizontal: 10, alignItems: "center", marginTop: -25 }}>

        {/* Client and Volunteer tabs below the logo */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          {checkUserData.map((item, index) => {
            return (
              <CustomButton
                onPress={() => setCheckUser(item)}
                width={"46%"}
                borderTopLeftRadius={10}
                height={verticalScale(27)}
                borderTopRightRadius={10}
                backgroundColor={
                  checkUser == item ? colors.secondary : colors.primary
                }
                title={item}
                key={index}
              />
            )
          })}
        </View>

        <Spacer height={20} />

        {/* Email input */}
        <CustomTextInput
          placeholder="Email"
          paddingLeft={20}
          value={email}
          error={emailError}
          onChangeText={(txt) => {
            setEmail(txt)
            setEmailError("")
          }}
          alignSelf="center"
          width="92%"
          borderRadius={15}
        />

        <Spacer height={25} />

        {/* Password input */}
        <CustomTextInput
          placeholder="Password"
          paddingLeft={20}
          error={passwordError}
          value={password}
          secureTextEntry={showPassword}
          onChangeText={(txt) => {
            setPassword(txt)
            setPasswordError("")
          }}
          alignSelf="center"
          width="90%"
          borderRadius={15}
          onRightPress={() => {
            setShowPassword(!showPassword)
          }}
          iconHeight={verticalScale(15)}
          rigthIcon={showPassword ? icons.eyeSlash : icons.eye}
        />
      </View>

      {/* Bottom part of the screen with Forgot Password, etc. */}
      <LoginBottom
        navigation={navigation}
        checkUser={checkUser}
        remember={remember}
        setRemember={setRemember}
        loading={loading}
        onPress={() => onSubmitLogin()}
      />
    </>
  )
}


export default LoginBody
