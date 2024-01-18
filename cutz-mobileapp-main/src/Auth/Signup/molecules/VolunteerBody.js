import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../components/CustomText";
import CustomTextInput from "../../../components/CustomTextInput";
import PhoneInput from "react-native-phone-number-input";
import { colors } from "../../../utils/Colors";
import { PH20 } from "../../../utils/CommonStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../../components/Spacer";
import SignupBottom from "./SignupBottom";
import { useSignup } from "../useSignup";
import { VolunteerSignup } from "../../../services/LoginSignupApi";
import { useVolunteerSignup } from "../useVolunteerSignup";
import { useDispatch } from "react-redux";
import { icons } from "../../../../assets/icons";
import { useFocusEffect } from "@react-navigation/native";

const VolunteerBody = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [familySize, setFamilySize] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [phoneRaw, setPhoneRaw] = useState("");
  const dispatch = useDispatch();
  const [signupErrors, setSignupError] = useState({
    firstError: "",
    lastError: "",
    emailError: "",
    phoneError: "",
    addressError: "",
    sizeError: "",
    passwordError: "",
    confirmError: "",
    employerError: "",
    organizationError: "",
  });
  const [signupValue, setSignupValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    employer: "",
    organization: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        signupValue({})
      
      };
    }, [])
  );

  const SignupData = [
    {
      id: 1,
      placeholder: "Email",

      value: signupValue.email,
      editable: false,
      error: signupErrors.emailError,
      onChangeText: (txt) => {
        setSignupValue({ ...signupValue, email: txt });
        setSignupError({ ...signupErrors, emailError: "" });
      },
    },
    {
      id: 2,
      placeholder: "Phone Number",
      error: signupErrors.phoneError,
      value: signupValue.phoneNumber,
      keyboardType: "number-pad",

      onChangeText: (txt) => {
        formatePhone(txt);
      },
      onChangeFormattedText: (txt) => {
        setSignupError({ ...signupErrors, phoneError: "" });
        setPhoneRaw(txt);
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 3,
      placeholder: "Address",
      value: signupValue.address,
      error: signupErrors.addressError,

      onChangeText: (txt) => {
        setSignupValue({ ...signupValue, address: txt });
        setSignupError({ ...signupErrors, addressError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 4,
      placeholder: "Employer",
      value: signupValue.employer,
      error: signupErrors.employerError,
      onChangeText: (txt) => {
        setSignupValue({ ...signupValue, employer: txt });
        setSignupError({ ...signupErrors, employerError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 5,
      placeholder: "Organization",
      value: signupValue.organization,
      error: signupErrors.organizationError,
      onChangeText: (txt) => {
        setSignupValue({ ...signupValue, organization: txt });
        setSignupError({ ...signupErrors, organizationError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 7,
      placeholder: "Password",
      error: signupErrors.passwordError,
      secureTextEntry: showPassword,
      rigthIcon: showPassword ? icons.eyeSlash : icons.eye,

      onRightPress: () => {
        setShowPassword(!showPassword);
      },
      // {() => {
      //   if (item.placeholder === "Password")
      //     setShowPassword(!showPassword);
      //   else setShowPassword1(!showPassword1);
      // }}

      value: signupValue.password,
      onChangeText: (txt) => {
        setSignupValue({ ...signupValue, password: txt });
        setSignupError({ ...signupErrors, passwordError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 7,
      placeholder: "Confirm Password",
      error: signupErrors.confirmError,
      value: signupValue.confirmPassword,
      rigthIcon: showPassword1 ? icons.eyeSlash : icons.eye,

      secureTextEntry: showPassword1,
      onRightPress: () => {
        setShowPassword1(!showPassword1);
      },
      onChangeText: (txt) => {
        setSignupValue({ ...signupValue, confirmPassword: txt });
        setSignupError({ ...signupErrors, confirmError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
  ];

  const onSubmitSignup = async () => {
    console.log("nkbk");
    const ValidateResponse = useVolunteerSignup(
      signupValue,
      signupErrors,
      setSignupError,
      phoneRaw
    );
    if (ValidateResponse) {
      const data = {
        firstName: signupValue.firstName,
        lastName: signupValue.lastName,
        email: signupValue.email,
        phoneNumber: signupValue.phoneNumber,
        address: signupValue.address,
        employer: signupValue.employer,
        organization: signupValue.organization,
        password: signupValue.password,
        confirmPassword: signupValue.confirmPassword,
        volunteerAttandance: "none",
      };
      await VolunteerSignup(
        data,
        setLoading,
        props.navigation,
        props.checkUser,
        dispatch
      );
      // console.log("ResponseData",res?.data)
    }

    // navigation.navigate("MainStack", {
    //   screen: "Welcome",
    //   params: { userType: props.checkUser },
    //   merge: true,
    // });
  };
  const formatePhone = (phoneNumberString) => {
    let newText = "";
    let cleaned = ("", phoneNumberString).replace(/\D/g, "");
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 0) {
        newText = "(";
      } else if (i == 3) {
        newText = newText + ") ";
      } else if (i == 6) {
        newText = newText + "-";
      }
      newText = newText + cleaned[i];
    }
    setSignupValue({ ...signupValue, phoneNumber: newText });
    setSignupError({ ...signupErrors, phoneError: "" });
  };
  return (
    <>
      <View>
        <Spacer height={20} />
        <PH20>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CustomTextInput
              placeholder="First"
              paddingLeft={20}
              value={signupValue.firstName}
              error={signupErrors.firstError}
              onChangeText={(txt) => {
                setSignupValue({ ...signupValue, firstName: txt });
                setSignupError({ ...signupErrors, firstError: "" });
              }}
              alignSelf="center"
              width="45%"
              borderRadius={15}
            />

            <CustomTextInput
              placeholder="Last"
              paddingLeft={20}
              alignSelf="center"
              value={signupValue.lastName}
              error={signupErrors.lastError}
              onChangeText={(txt) => {
                setSignupValue({ ...signupValue, lastName: txt });
                setSignupError({ ...signupErrors, lastError: "" });
              }}
              width="45%"
              borderRadius={15}
            />
          </View>
          <Spacer height={10} />

          {SignupData.map((item) => (
            <>
              <Spacer height={10} />
              <CustomTextInput
                placeholder={item.placeholder}
                paddingLeft={20}
                error={item.error}
                value={item.value}
                keyboardType={item.keyboardType}
                onChangeText={item.onChangeText}
                alignSelf="center"
                // width="100%"
                borderRadius={15}
                iconWidth={scale(15)}
                secureTextEntry={item.secureTextEntry}
                onRightPress={item.onRightPress}
                iconHeight={verticalScale(15)}
                rigthIcon={item.rigthIcon}
                // keyboardType={item.id===2?'numeric':''}
              />
              <Spacer height={10} />
            </>
          ))}
        </PH20>
      </View>

      <SignupBottom
        onSubmit={() => onSubmitSignup()}
        loading={loading}
        navigation={props.navigation}
        checkUser={props.checkUser}
      />
    </>
  );
};

export default VolunteerBody;

const styles = StyleSheet.create({});
