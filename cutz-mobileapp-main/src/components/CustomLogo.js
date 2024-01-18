import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { images } from "../../assets/images";
import commonStyles from "../utils/CommonStyles";
import { scale, verticalScale } from "react-native-size-matters";


const CustomLogo = ({width,height,resizeMode,logo}) => {
  return (
    <View
      style={{
        width: width || "100%",
        height: height || verticalScale(250),
        alignSelf: "center",
        // backgroundColor:"red"
      }}
    >
      <Image
        resizeMode={resizeMode || "contain"}
        source={logo?images.logo: images.mainLogo}
        style={commonStyles.img}
      />
    </View>
  );
};

export default CustomLogo;

const styles = StyleSheet.create({});
