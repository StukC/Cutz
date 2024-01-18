import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verticalScale } from "react-native-size-matters";
import CustomLogo from "../../../components/CustomLogo";
import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import { colors } from "../../../utils/Colors";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import { Spacer } from "../../../components/Spacer";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomOtp from "../../../components/CustomOtp";
import Toast from "react-native-root-toast";
import {
  ClientOtpVerified,
  VolunteerOtpVerified,
} from "../../../services/EventClientsApi";

const ConfirmOtyBody = ({
  navigation,
  checkUserParams,
  route,
  setCheckUser,
  checkUser,
  state,
  email,
  setState,
}) => {
  const AuthUser = useSelector((state) => state.authReducers.authState);
  const checkUserData = ["Client", "Volunteer"];

  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [passwordValue, setPasswordValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgetErrors, setForgetErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmError: "",
  });

  const onPress = async () => {
    // pin1:"",
    // pin2:"",
    // pin3:"",
    // pin3:"",
    console.log("dataus", state.pin1);

    if (!state.pin1) {
      Toast.show("Please enter Otp");

      return;
    }
    if (!state.pin2) {
      Toast.show("Please enter Otp");
      return;
    }
    if (!state.pin3) {
      Toast.show("Please enter Otp");
      return;
    }
    if (!state.pin4) {
      Toast.show("Please enter Otp");
      return;
    }
    // const validateResponse = UseForget(
    //   passwordValue,
    //   forgetErrors,
    //   setForgetErrors
    // );
    const data = {
      email: email,
      otp: `${state.pin1}${state.pin2}${state.pin3}${state.pin4}`,
    };
    console.log("AllDataotp", data);
    setLoading(true);

    // if (validateResponse) {
    if (checkUser == "Client") {
      console.log("checkUserParams", checkUser);
      ClientOtpVerified(data,setLoading,navigation, checkUser,email)

     
    } else if (checkUser == "Volunteer") {
      console.log("checkUserParams", checkUser);
      VolunteerOtpVerified(data,setLoading,navigation, checkUser,email)
    }
    // }
  };

  return (
    <View>
      {/* Webview and stuff */}

      <PH20>
        <CustomLogo />
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
                  item == checkUser ? colors.secondary : colors.primary
                }
                title={item}
              />
            );
          })}
        </View>
        <Spacer height={50} />
        <CustomOtp setState={setState} state={state} />

        {/* <CustomTextInput
        placeholder="E-mail"
        paddingLeft={20}
        alignSelf="center"
        width="100%"
        value={passwordValue.email}
        error={forgetErrors.emailError}
        onChangeText={(txt) => {
          setPasswordValue({ ...passwordValue, email: txt });
          setForgetErrors({ ...forgetErrors, emailError: "" }); 
        }}
        borderRadius={15}
      /> */}

        {/* <View style={{height:"10%"}}/> */}

        <Spacer height={50} />

        <View style={{ alignItems: "center" }}>
          <CustomButton
            width={"55%"}
            fontFamily={"bold"}
            onPress={onPress}
            loading={loading}
            borderRadius={15}
            title="Next"
            btnStyle={commonStyles.customShadow}
          />

          <CustomText
            marginTop={verticalScale(10)}
            label="©2023 COVERSHIFTZ, LLC"
            fontFamily="bold"
            fontSize={10}
            color={colors.darkGray}
          />
        </View>
      </PH20>
    </View>
  );
};

export default ConfirmOtyBody;

const styles = StyleSheet.create({});
