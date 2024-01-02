import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../utils/Colors";
import { icons } from "../../../../../assets/icons";
import CustomText from "../../../../components/CustomText";
import { Image } from "react-native-elements";

const ThumbGreeting = ({onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    activeOpacity={1}
      style={{
        flex: 1,
        backgroundColor: colors.Brown5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomText
        label={"Thank you!"}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={14}
      />
      <CustomText
        label={"You are confirmed to"}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={14}
      />
      <CustomText
        label={"VOLUNTEER at this event!"}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={14}
      />
      <Image
        source={icons.thumb}
        resizeMode={"contain"}
        containerStyle={{
          height: 200,
          width: 200,
          marginVertical: 40,
        }}
      />
      <CustomText
        label={"Your volunteer dates and history"}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={14}
      />
      <CustomText
        label={"are viewable by tapping on"}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={14}
      />
      <CustomText
        label={"the clipboard below."}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={14}
      />
    </TouchableOpacity>
  );
};

export default ThumbGreeting;

const styles = StyleSheet.create({});
