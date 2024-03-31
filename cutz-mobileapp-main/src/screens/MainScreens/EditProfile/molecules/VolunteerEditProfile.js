import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-native-phone-number-input";
import { colors } from "../../../../utils/Colors";
import { PH20 } from "../../../../utils/CommonStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../../../components/Spacer";
import CustomInputs from "./CustomInputs";
import CustomButton from "../../../../components/CustomButton";
import { icons } from "../../../../../assets/icons";
import { useSelector } from "react-redux";
import { useVolunteerSignup } from "../../../../Auth/Signup/useVolunteerSignup";
import { useDispatch } from "react-redux";
import CustomText from "../../../../components/CustomText";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as FileSystem from "expo-file-system";

import {
  DeleteVolunteerEvent,
  UpdateVolunteerEvent,
} from "../../../../services/EventClientsApi";
import Toast from "react-native-root-toast";
import { URLS } from "../../../../services/Urls";
import { UploadImage } from "../../../../services/UploadImage";
const VolunteerEditProfile = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [familySize, setFamilySize] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const [showPassword1, setShowPassword1] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [newConfirmError, setNewConfirmError] = useState("");
  // const [newPasword, setnewPawword] = useState(second)
  const AuthUser = useSelector((state) => state.authReducers.authState);
  console.log("CurrentUserData", AuthUser?.AuthUser);
  const [phoneRaw, setPhoneRaw] = useState("");
  

  const [editErrors, setEditError] = useState({
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
  const [editValue, setEditValue] = useState({
    firstName: AuthUser?.firstName,
    lastName: AuthUser?.lastName,
    email: AuthUser?.email,
    phoneNumber: AuthUser?.phoneNumber,
    address: AuthUser?.address,
    password: "empty11111",
    confirmPassword: "empty11111",
    employer: AuthUser.employer,
    organization: AuthUser.organization,
  });

  // const SignupData = [
  //   {
  //     id: 1,
  //     placeholder: "E-mail",

  //     //   value: signupValues.country,
  //     editable: false,
  //   },
  //   {
  //     id: 2,
  //     placeholder: "Phone Number",

  //     //   value: signupValues.country,
  //     editable: false,
  //   },
  //   {
  //     id: 3,
  //     placeholder: "Address",

  //     //   value: signupValues.country,
  //     editable: false,
  //   },
  //   {
  //     id: 4,
  //     placeholder: "Employeer (if any)",

  //     //   value: signupValues.country,
  //     editable: false,
  //   },
  //   {
  //     id: 5,
  //     placeholder: "Organization(s)",

  //     //   value: signupValues.country,
  //     editable: false,
  //   },
  //   {
  //     id: 7,
  //     placeholder: "Password",

  //     //   value: signupValues.country,
  //     editable: false,
  //   },
  //   {
  //     id: 7,
  //     placeholder: "Confirm Password",

  //     //   value: signupValues.country,
  //     editable: false,
  //   },
  // ];

  const SignupData = [
    {
      id: 1,
      placeholder: "Email",

      value: editValue.email,
      editable: false,
      error: editErrors.emailError,
      onChangeText: (txt) => {
        setEditValue({ ...editValue, email: txt });
        setEditError({ ...editErrors, emailError: "" });
      },
    },
    {
      id: 2,
      placeholder: "Phone Number",
      error: editErrors.phoneError,
      value: editValue.phoneNumber,
      keyboardType:"number-pad",

      onChangeText: (txt) => {
        formatePhone(txt);
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 3,
      placeholder: "Address",
      value: editValue.address,
      error: editErrors.addressError,

      onChangeText: (txt) => {
        setEditValue({ ...editValue, address: txt });
        setEditError({ ...editErrors, addressError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 4,
      placeholder: "Employer",
      value: editValue.employer,
      error: editErrors.employerError,
      onChangeText: (txt) => {
        setEditValue({ ...editValue, employer: txt });
        setEditError({ ...editErrors, employerError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 5,
      placeholder: "Organization",
      value: editValue.organization,
      error: editValue.organizationError,
      onChangeText: (txt) => {
        setEditValue({ ...editValue, organization: txt });
        setEditError({ ...editErrors, organizationError: "" });
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 7,
      placeholder: "Password",
      error: newPassError,
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

      value: newPassword,
      onChangeText: (txt) => {
        setNewPassword( txt );
        setNewPassError( "" );
      },

      //   value: signupValues.country,
      editable: false,
    },
    {
      id: 7,
      placeholder: "Confirm Password",
      error: newConfirmError,
      value: newConfirmPassword,
      rigthIcon: showPassword1 ? icons.eyeSlash : icons.eye,

      secureTextEntry: showPassword1,
      onRightPress: () => {
        setShowPassword1(!showPassword1);
      },
      onChangeText: (txt) => {
        setNewConfirmPassword( txt );
        setNewConfirmError( "" );
      },

      //   value: signupValues.country,
      editable: false,
    },
  ];

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
    setEditValue({ ...editValue, phoneNumber: newText });
    setEditError({ ...editErrors, phoneError: "" });
  };

  const onSubmitSignup = async () => {
    console.log("nkbk");
    const ValidateResponse = useVolunteerSignup(
      editValue,
      editErrors,
      setEditError
    );
    if (ValidateResponse) {
//       const forBase64 = await FileSystem.readAsStringAsync(props.imageUri, { encoding: 'base64' });
// console.log("Imagebsze",forBase64)
      const data = {
        firstName: editValue.firstName,
        lastName: editValue.lastName,
        email: editValue.email,
        phoneNumber: editValue.phoneNumber,
        address: editValue.address,
        employer: editValue.employer,
        organization: editValue.organization,
        // password: editValue.password,
        // confirmPassword: editValue.confirmPassword,
        profilePicture: "",
      };

      if (newPassword) {
        if (newPassword.length <= 7) {
          setNewPassError("password must be greater then 7 digits");
          return;
        }
        if (!newConfirmPassword) {
          setNewConfirmError("Confirm password is required");
          return;
        }
        if (newConfirmPassword != newPassword) {
          setNewConfirmError("confirm password is not match");
          return;
        }
        data[
          "password"
        ] = newPassword;
        data[
          "confirmPassword"
        ] = newConfirmPassword;

      }


    props.setLoading(true)

      if (props.imageUri) {
        try {
          const res = await UploadImage(props.imageUri);
          console.log("resImage", res);

          const imageData=res.link.slice( 1 )
          data[
            "profilePicture"
          ] = `${URLS.BASE_URL}${
            imageData
          }`;
        } catch (error) {}
      }
      console.log("ChengeData", data);
      await UpdateVolunteerEvent(
        AuthUser?.token,
        data,
        AuthUser,
        dispatch,
        props.setLoading
      );
    }
  };

  const onSubmitDelete = async () => {
    const res = await DeleteVolunteerEvent(AuthUser?.token);
    if (res?.data) {
      Toast.show("Account deleted successfully");
      props?.navigation.navigate("AuthStack", { screen: "signup" });
    }
  };
  return (
    <>
      <View>
        <Spacer height={40} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // height:verticalScale(100)
          }}
        >
          <View style={{ width: "45%" }}>
            <CustomInputs
              placeholder="First"
              paddingLeft={20}
              value={editValue.firstName}
              onChangeText={(txt) => {
                setEditValue({ ...editValue, firstName: txt });
                setEditError({ ...editErrors, firstError: "" });
              }}
              alignSelf="center"
            />

            {editErrors.firstError && (
              <CustomText
                marginTop={5}
                fontSize={9}
                label={editErrors.firstError}
                color={colors.red}
              />
            )}
          </View>
          <View style={{ width: "45%" }}>
            <CustomInputs
              placeholder="Last"
              paddingLeft={20}
              alignSelf="center"
              value={editValue.lastName}
              onChangeText={(txt) => {
                setEditValue({ ...editValue, lastName: txt });
                setEditError({ ...editErrors, lastError: "" });
              }}
            />
            {editErrors.lastError && (
              <CustomText
                marginTop={5}
                fontSize={9}
                label={editErrors.lastError}
                color={colors.red}
              />
            )}
          </View>
        </View>
        {/* <GooglePlacesAutocomplete
          placeholder="Please search"
          debounce={400}
          styles={{
            backgroundColor: "red",
            borderRa: 10,
            borderBottomWidth: 1,
            fontSize: 15,
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log("dataDeailSI", data, details);
          }}
          query={{
            key: URLS.GOOGL_MAP_API,
            language: "en",
          }}
        /> */}
        {SignupData.map((item) => {
          return (
            <>
              <Spacer height={35} />
              <CustomInputs
                placeholder={item.placeholder}
                paddingLeft={20}
                error={item.error}
                value={item.value}
                keyboardType={item.keyboardType}
                onChangeText={item.onChangeText}
                alignSelf="center"
                width="100%"
                secureTextEntry={item.secureTextEntry}
                onRightPress={item.onRightPress}
                iconHeight={verticalScale(15)}
                rigthIcon={item.rigthIcon}
                // iconWidth={scale(15)}
                // secureTextEntry={item.secureTextEntry}
                // onRightPress={item.onRightPress}
                // iconHeight={verticalScale(15)}
                // rigthIcon={item.rigthIcon}
              />

              {/* <CustomInputs
                  placeholder={item.placeholder}
                  paddingLeft={20}
                  alignSelf="center"
                  width="100%"
                /> */}
            </>
          );
        })}
      </View>
      <Spacer height={35} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 5,
        }}
      >
        <CustomButton
          title="Update"
          onPress={onSubmitSignup}
          borderRadius={15}
          fontFamily={"bold"}
          width={"40%"}
          btnStyle={{
            shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
            shadowRadius: 2,
            elevation: 3,
            shadowOpacity: 0.4,
            // inputMarginTop:-20,
            shadowOffset: { width: -1, height: 3 },
          }}
          backgroundColor={colors.secondary}
        />
        <CustomButton
          onPress={onSubmitDelete}
          title="Delete"
          borderRadius={15}
          fontFamily={"bold"}
          width={"40%"}
          btnStyle={{
            shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
            shadowRadius: 2,
            elevation: 3,
            shadowOpacity: 0.4,
            // inputMarginTop:-20,
            shadowOffset: { width: -1, height: 3 },
          }}
          backgroundColor={colors.primary}
        />
      </View>
    </>
  );
};

export default VolunteerEditProfile;

const styles = StyleSheet.create({});
