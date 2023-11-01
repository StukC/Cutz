import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SepratorLine from "../../../components/SepratorLine";
import { colors } from "../../../utils/Colors";
import CustomText from "../../../components/CustomText";
import { verticalScale } from "react-native-size-matters";
import { PH20 } from "../../../utils/CommonStyles";

const NameContainer = (props) => {
  return (
    <>
   
      <View
        style={{
          flexDirection: "row",
          height: verticalScale(48),
          alignItems: "flex-end",
          backgroundColor: colors.inputGray,
        }}
      >
        <PH20>
          <CustomText
            color={colors.gray5}
            fontSize={14}
            fontFamily="medium"
            //   marginLeft={10}
            marginBottom={7}
            //   alignSelf="center"
            label={props.name}
          />
        </PH20>
      </View>
      <SepratorLine
backgroundColor={"#9A9A9A"}
height={0.5}    
    />
    </>
  );
};

export default NameContainer;

const styles = StyleSheet.create({});
