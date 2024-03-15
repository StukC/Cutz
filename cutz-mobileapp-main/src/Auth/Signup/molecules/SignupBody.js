import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { PH20 } from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../utils/Colors";
import PhoneInput from "react-native-phone-number-input";
import { scale, verticalScale } from "react-native-size-matters";
import { Platform } from "react-native";
import CustomText from "../../../components/CustomText";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import SignupBottom from "./SignupBottom";
import { useSignup } from "../useSignup";
import { ClientSignup, UserSignup } from "../../../services/LoginSignupApi";
import { icons } from "../../../../assets/icons";
import { useFocusEffect } from "@react-navigation/native";

const SignupBody = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [familySize, setFamilySize] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [signupErrors, setSignupError] = useState({
    firstError: "",
    lastError: "",
    emailError: "",
    phoneError: "",
    addressError: "",
    sizeError: "",
    passwordError: "",
    cardNumberError:"",
    confirmError: "",
  });
  const [signupValue, setSignupValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    familySize: "",
    password: "",
    confirmPassword: "",
    cardNumber:"",
  });

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        signupValue({})

      };
    }, [])
  );

  const onSetValue = (item) => {
    console.log("Item", item);

    item;
    setSignupValue({ ...signupValue, familySize: item });
    setSignupError({ ...signupErrors, sizeError: "" });

    setModalVisible(false);
  };

  const onSubmitSignup = async () => {
    console.log("nkbk");
    const ValidateResponse = useSignup(
      signupValue,
      signupErrors,
      setSignupError
    );
    if (ValidateResponse) {
      const data = {
        firstName: signupValue.firstName,
        lastName: signupValue.lastName,
        email: signupValue.email,
        phoneNumber: signupValue.phoneNumber,
        address: signupValue.address,
        familySize: Number(signupValue.familySize),
        cardNumber: signupValue.cardNumber,
        password: signupValue.password,
        confirmPassword: signupValue.confirmPassword,
        clientAttandance: "none",
      };
      console.log('wow')
      // await ClientSignup(
      await UserSignup(
      data,
        setLoading,
        props.navigation,
        props.checkUser,
        dispatch
      );

      // console.log("ResponseData", responData);
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
        {/* <Spacer height={20} /> */}
        <PH20>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              // height: verticalScale(100),
              paddingVertical: verticalScale(20),
            }}
          >
            <CustomTextInput
              placeholder="First"
              paddingLeft={20}
              value={signupValue.firstName}
              error={signupErrors.firstError}
              alignSelf="center"
              onChangeText={(txt) => {
                setSignupValue({ ...signupValue, firstName: txt });
                setSignupError({ ...signupErrors, firstError: "" });
              }}
              width="45%"
              borderRadius={15}
            />

            <CustomTextInput
              placeholder="Last"
              paddingLeft={20}
              value={signupValue.lastName}
              error={signupErrors.lastError}
              onChangeText={(txt) => {
                setSignupValue({ ...signupValue, lastName: txt });
                setSignupError({ ...signupErrors, lastError: "" });
              }}
              alignSelf="center"
              width="45%"
              borderRadius={15}
            />
          </View>
          {/* <Spacer height={20} /> */}

          <CustomTextInput
            placeholder="Email"
            paddingLeft={20}
            alignSelf="center"
            value={signupValue.email}
            error={signupErrors.emailError}
            onChangeText={(txt) => {
              setSignupValue({ ...signupValue, email: txt });
              setSignupError({ ...signupErrors, emailError: "" });
            }}
            width="100%"
            borderRadius={15}
          />
          <Spacer height={20} />
          <CustomTextInput
            placeholder="Phone Number!!"
            paddingLeft={20}
            alignSelf="center"
            keyboardType="number-pad"

            value={signupValue.phoneNumber}
            error={signupErrors.phoneError}
            onChangeText={(txt) => {
              formatePhone(txt);
            }}
            width="100%"
            borderRadius={15}
          />

          <Spacer height={20} />
          <CustomTextInput
            placeholder="Address"
            paddingLeft={20}
            alignSelf="center"
            value={signupValue.address}
            error={signupErrors.addressError}
            onChangeText={(txt) => {
              setSignupValue({ ...signupValue, address: txt });
              setSignupError({ ...signupErrors, addressError: "" });
            }}
            width="100%"
            borderRadius={15}
          />

          <Spacer height={15} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText
              label="Family Size :"
              fontFamily="bold"
              marginRight={15}
              fontSize={20}
              color={colors.placeholder}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setModalVisible(true)}
              style={{
                maxWidth: scale(80),
                height: verticalScale(42),
                backgroundColor: "#EBEBEB",
                borderRadius: scale(15),
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
                shadowRadius: 2,
                elevation: 5,
                shadowOpacity: 0.4,
                shadowOffset: { width: -1, height: 3 },
              }}
            >
              <CustomText
                label={signupValue.familySize}
                fontFamily="bold"
                marginRight={15}
                fontSize={20}
                color={colors.black}
              />
              <AntDesign name="caretdown" size={24} color="#727171" />
            </TouchableOpacity>
          </View>
          {signupErrors.sizeError && (
            <CustomText
              marginTop={5}
              fontSize={9}
              marginLeft={10}
              label={signupErrors.sizeError}
              color={colors.red}
            />
          )}

          <CustomTextInput
            placeholder="Card Number"
            paddingLeft={20}
            alignSelf="center"
            width="100%"
          

            value={signupValue.cardNumber}
            error={signupErrors.cardNumberError}
            onChangeText={(txt) => {
              setSignupValue({ ...signupValue, cardNumber: txt });
                setSignupError({ ...signupErrors, cardNumberError: "" });
            }}
          />

          <Spacer height={15} />
          <CustomTextInput
            placeholder="Password"
            paddingLeft={20}
            alignSelf="center"
            width="100%"
            value={signupValue.password}
            error={signupErrors.passwordError}
            secureTextEntry={showPassword}
            onRightPress={() => {
              setShowPassword(!showPassword);
            }}
            iconHeight={verticalScale(15)}
            rigthIcon={showPassword ? icons.eyeSlash : icons.eye}
            onChangeText={(txt) => {
              setSignupValue({ ...signupValue, password: txt });
              setSignupError({ ...signupErrors, passwordError: "" });
            }}
            borderRadius={15}
          />
          <Spacer height={20} />

          <CustomTextInput
            placeholder="Confirm Password"
            paddingLeft={20}
            alignSelf="center"
            width="100%"
            value={signupValue.confirmPassword}
            error={signupErrors.confirmError}
            secureTextEntry={showPassword1}
            onRightPress={() => {
              setShowPassword1(!showPassword1);
            }}
            iconHeight={verticalScale(15)}
            rigthIcon={showPassword1 ? icons.eyeSlash : icons.eye}
            onChangeText={(txt) => {
              setSignupValue({ ...signupValue, confirmPassword: txt });
              setSignupError({ ...signupErrors, confirmError: "" });
            }}
            borderRadius={15}
          />
        </PH20>
      </View>
      <CustomBottomSheet
        modalVisible={modalVisible}
        list={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
        ]}
        onSetValue={onSetValue}
        setValue={setFamilySize}
        onCloseModal={() => setModalVisible(false)}
      />
      <SignupBottom
        onSubmit={() => onSubmitSignup()}
        loading={loading}
        navigation={props.navigation}
        checkUser={props.checkUser}
      />
    </>
  );
};

export default SignupBody;

const styles = StyleSheet.create({});