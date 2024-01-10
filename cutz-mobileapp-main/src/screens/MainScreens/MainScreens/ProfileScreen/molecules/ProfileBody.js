import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import CustomText from "../../../../components/CustomText";
import { colors } from "../../../../utils/Colors";
import { icons } from "../../../../../assets/icons";

const ProfileBody = (props) => {
  return (
    <TouchableOpacity
    activeOpacity={0.6}
    onPress={props.onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          resizeMode="contain"
          style={{ width: scale(27), height: scale(27) }}
          source={props.img}
        />
        <CustomText
          label={props.name}
          fontSize={13}
        //   fontWeight="bold"
          fontFamily={props.family ||"light"}
          marginLeft={20}
          color={props.color|| colors.secondary}
        />
      </View>


      <Image
          resizeMode="contain"
          style={{ width: scale(17), height: scale(17) }}
          source={icons.go}
        />

      
    </TouchableOpacity>
  );
};

export default ProfileBody;

const styles = StyleSheet.create({});
