import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../../components/CustomTextInput";
import { Spacer } from "../../../components/Spacer";
import { icons } from "../../../../assets/icons";
import { scale, verticalScale } from "react-native-size-matters";
import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/Colors";
import { UseForget } from "../UseForget";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  ClientForgetPassword,
  ForgetClientPassword,
  ForgetVolunteerPassword,
  UpdateClientEvent,
  VolunteerForgetPassword,
} from "../../../services/EventClientsApi";
import Toast from "react-native-root-toast";
import CustomLogo from "../../../components/CustomLogo";

const ForgetBody = ({
  navigation,
  checkUserParams,
  route,
  email,
  setCheckUser,
  checkUser,
}) => {
  const AuthUser = useSelector((state) => state.authReducers.authState);
  const checkUserData = ["Client", "Volunteer"];

  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [passwordValue, setPasswordValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const [forgetErrors, setForgetErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmError: "",
  });

  const onPress = async () => {
    const validateResponse = UseForget(
      passwordValue,
      forgetErrors,
      setForgetErrors
    );
    const data = {
      email: email,
      password: passwordValue.password,
      confirmPassword: passwordValue.confirmPassword,
    };
    setLoading(true);

    if (validateResponse) {
      if (checkUser == "Client") {
        console.log("checkUserParams", checkUser);
        // if (Object.keys(AuthUser).length !== 0) {

        ClientForgetPassword(data, setLoading, navigation, checkUser, email);

        // } else {
        //   Toast.show("Client not exist please create account");
        // }
      } else if (checkUser == "Volunteer") {
        console.log("checkUserParams", checkUser);

        VolunteerForgetPassword(data, setLoading, navigation, checkUser, email);

        //  await VolunteerLogin(data, setLoading, navigation, checkUser,dispatch,remember);
      }
    }
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
        <Spacer height={20} />

        <CustomTextInput
          placeholder="New Password"
          paddingLeft={20}
          alignSelf="center"
          width="100%"
          value={passwordValue.password}
          error={forgetErrors.passwordError}
          secureTextEntry={showPassword}
          onRightPress={() => {
            setShowPassword(!showPassword);
          }}
          iconHeight={verticalScale(15)}
          rigthIcon={showPassword ? icons.eyeSlash : icons.eye}
          onChangeText={(txt) => {
            setPasswordValue({ ...passwordValue, password: txt });
            setForgetErrors({ ...forgetErrors, passwordError: "" });
          }}
          borderRadius={15}
        />
        <Spacer height={20} />

        <CustomTextInput
          placeholder="Confirm Password"
          paddingLeft={20}
          alignSelf="center"
          width="100%"
          value={passwordValue.confirmPassword}
          error={forgetErrors.confirmError}
          secureTextEntry={showPassword1}
          onRightPress={() => {
            setShowPassword1(!showPassword1);
          }}
          iconHeight={verticalScale(15)}
          rigthIcon={showPassword1 ? icons.eyeSlash : icons.eye}
          onChangeText={(txt) => {
            setPasswordValue({ ...passwordValue, confirmPassword: txt });
            setForgetErrors({ ...forgetErrors, confirmError: "" });
          }}
          borderRadius={15}
        />
        <Spacer height={50} />

        <View style={{ alignItems: "center" }}>
          <CustomButton
            width={"55%"}
            fontFamily={"bold"}
            onPress={onPress}
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

export default ForgetBody;

const styles = StyleSheet.create({});
