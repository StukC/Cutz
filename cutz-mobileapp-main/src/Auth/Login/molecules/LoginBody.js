import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { Spacer } from "../../../components/Spacer";
import CustomButton from "../../../components/CustomButton";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/Colors";
import LoginBottom from "./LoginBottom";
import { useLogin } from "../useLogin";
import { ClientLogin, VolunteerLogin } from "../../../services/LoginSignupApi";
import { useDispatch } from "react-redux";
import { icons } from "../../../../assets/icons";
import { useFocusEffect } from "@react-navigation/native";

const LoginBody = ({ user, setCheckUser, checkUser, navigation }) => {
  const checkUserData = ["Client", "Volunteer"];
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        setEmail("");
        setPassword("");
        setCheckUser("Client")
        setShowPassword(true);
        setPasswordError("");
        setEmailError("");
        setRemember(false)
      };
    }, [])
  );

  const onSubmitLogin = async () => {
    const validateResponse = useLogin(
      email,
      setEmailError,
      password,
      setPasswordError
    );
    const data = {
      email: email,
      password: password,
    };

    if (validateResponse) {
      if (checkUser == "Client") {
        await ClientLogin(
          data,
          setLoading,
          navigation,
          checkUser,
          dispatch,
          remember
        );
      } else if (checkUser == "Volunteer") {
        console.log("Colluneter", checkUser);
        await VolunteerLogin(
          data,
          setLoading,
          navigation,
          checkUser,
          dispatch,
          remember
        );
      }
    }
  };
  return (
    <>
      <View
        style={{ paddingHorizontal: 10, alignItems: "center", marginTop: -25 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              />
            );
          })}
        </View>
        <Spacer height={20} />

        <CustomTextInput
          placeholder="Email"
          paddingLeft={20}
          value={email}
          error={emailError}
          onChangeText={(txt) => {
            setEmail(txt);
            setEmailError("");
          }}
          alignSelf="center"
          width="92%"
          borderRadius={15}
        />
        <Spacer height={25} />

        <CustomTextInput
          placeholder="Password"
          paddingLeft={20}
          error={passwordError}
          value={password}
          secureTextEntry={showPassword}
          onChangeText={(txt) => {
            setPassword(txt);
            setPasswordError("");
          }}
          alignSelf="center"
          width="90%"
          borderRadius={15}
          onRightPress={() => {
            setShowPassword(!showPassword);
          }}
          iconHeight={verticalScale(15)}
          rigthIcon={showPassword ? icons.eyeSlash : icons.eye}
        />
      </View>

      <LoginBottom
        remember={remember}
        setRemember={setRemember}
        navigation={navigation}
        checkUser={checkUser}
        loading={loading}
        onPress={() => onSubmitLogin()}
      />
    </>
  );
};

export default LoginBody;

const styles = StyleSheet.create({});
