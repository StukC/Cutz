// cleaned up imports

import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "react-native-size-matters";

import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import CustomLogo from "../../../components/CustomLogo";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../utils/Colors";


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
          shadowOffset: { width: -1, height: 3 },
        }}
        title={"Create"}
        width={"50%"}
        borderRadius={15}
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(7) }}>

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