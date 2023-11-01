import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../utils/Colors";
import CustomText from "../../../components/CustomText";
import { Spacer } from "../../../components/Spacer";
import CustomButton from "../../../components/CustomButton";
import { verticalScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";

const LoginBottom = ({navigation,checkUser,remember, setRemember,onPress,loading}) => {

  return (
    <View style={{ alignItems: "center" }}>
      <Spacer height={20} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.checkCon}
          activeOpacity={0.6}
          onPress={() => setRemember(!remember)}
        >
          {remember && <Feather name="check" size={24} color={colors.secondary} />}
        </TouchableOpacity>

        <CustomText
          label="Remember Me"
          marginLeft={10}
          fontFamily="semiBold"
          fontSize={18}
          color={colors.placeholder}
        />
      </View>
      <Spacer height={30} />

      <CustomButton
        width={"55%"}
        fontFamily={"bold"}
        onPress={onPress}
        loading={loading}
        borderRadius={15}
        title="Log In"
        btnStyle={{
          shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
          shadowRadius: 2,
          elevation: 5,
          shadowOpacity: 0.4,
          // inputMarginTop:-20,
          shadowOffset: { width: -1, height: 3 },
        }}
      />
      <Spacer height={10} />
      <CustomText
      onPress={()=>navigation.navigate("ConfirmEmail",{checkUser:checkUser})}
        label="FORGOT PASSWORD"
        fontFamily="bold"
        fontSize={11}
        color={colors.secondary}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginTop: verticalScale(4),
        }}
      >
        <CustomText
          label="NOT REGISTERED? "
          fontFamily="bold"
          fontSize={8}
          color={colors.darkGray}
        />
        <CustomText
        onPress={()=>navigation.navigate("signup",{checkUser:checkUser})}
          label="CREATE AN ACCOUNT"
          fontFamily="bold"
          fontSize={8}
          color={colors.primary}
        />
      </View>
      <CustomText
        marginTop={verticalScale(5)}
        label="©2023 COVERSHIFTZ, LLC"
        fontFamily="bold"
        fontSize={10}
        color={colors.darkGray}
      />
    </View>
  );
};

export default LoginBottom;

const styles = StyleSheet.create({
  checkCon: {
    width: 23,
    height: 23,
    borderWidth: 1,
    backgroundColor:colors.white,
    borderColor: colors.secondary,
    borderRadius: 5,
    shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
    shadowRadius: 2,
    elevation: 5,
    shadowOpacity: 0.4,
    // inputMarginTop:-20,
    shadowOffset: { width: -1, height: 3 },
  },
});
