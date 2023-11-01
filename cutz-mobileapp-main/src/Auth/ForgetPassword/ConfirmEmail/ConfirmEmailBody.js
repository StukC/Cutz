import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomLogo from "../../../components/CustomLogo";
import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/Colors";
import { icons } from "../../../../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/CustomButton";
import { verticalScale } from "react-native-size-matters";
import { Spacer } from "../../../components/Spacer";
import {
  ClientSendOtp,
  VolunteerSendOtp,
} from "../../../services/EventClientsApi";
import { validateEmail } from "../../../utils/Email_Password_Validation";

const ConfirmEmailBody = ({
  navigation,
  checkUserParams,
  route,
  setCheckUser,
  checkUser,
}) => {
  const AuthUser = useSelector((state) => state.authReducers.authState);
  const checkUserData = ["Client", "Volunteer"];
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onPress = async () => {
    if (!email) {
      setEmailError("Please enter email");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Enter valid email");
      return
    }

    const data = {
      email: email,
    };
    setLoading(true);

    // if (validateResponse) {
    if (checkUser == "Client") {
      console.log("checkUserParams", checkUser);
      ClientSendOtp(data,setLoading,navigation, checkUser,email)


   
    } else if (checkUser == "Volunteer") {
      console.log("checkUserParams", checkUser);

    VolunteerSendOtp(data,setLoading,navigation, checkUser,email)
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

        <CustomTextInput
          placeholder="Email"
          paddingLeft={20}
          alignSelf="center"
          width="100%"
          value={email}
          error={emailError}
          onChangeText={(txt) => {
            setEmail(txt);
            setEmailError("");
          }}
          borderRadius={15}
        />

        {/* <View style={{height:"10%"}}/> */}

        <Spacer height={50} />

        <View style={{ alignItems: "center" }}>
          <CustomButton
            width={"55%"}
            fontFamily={"bold"}
            onPress={() => {
              onPress();
              // navigation.navigate("ConfirmOtp", { checkUser: checkUser,email:email })
            }}
            loading={loading}
            borderRadius={15}
            title="Submit"
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

export default ConfirmEmailBody;

const styles = StyleSheet.create({});
