import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../utils/Colors";
import CustomText from "../../../components/CustomText";
import { verticalScale } from "react-native-size-matters";
import CustomLogo from "../../../components/CustomLogo";
import { Platform } from "react-native";
import { Spacer } from "../../../components/Spacer";
import { useNavigation } from "@react-navigation/native";

const SignupBottom = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center", marginTop: verticalScale(20) }}>
      <CustomButton
      onPress={props.onSubmit}
      loading={props?.loading}
        btnStyle={{
          shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
          shadowRadius: 2,
          elevation: 5,
          shadowOpacity: 0.4,
          // inputMarginTop:-20,
          shadowOffset: { width: -1, height: 3 },
        }}
        title={"Create"}
        width={"50%"}
        borderRadius={15}
       
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: verticalScale(7),
        }}
      >
        <CustomText
          label="ALREADY A MEMBER?"
          fontFamily="bold"
          fontSize={8}
          color={colors.darkGray}
        />
        <CustomText
          onPress={() =>
            props.navigation.navigate("login", { checkUser: props.checkUser })
          }
          label="LOG IN"
          fontFamily="bold"
          marginLeft={4}
          fontSize={8}
          color={colors.primary}
        />
      </View>
      <Spacer height={2} />
      <CustomLogo logo width={70} height={70} />
    </View>
  );
};

export default SignupBottom;

const styles = StyleSheet.create({});
