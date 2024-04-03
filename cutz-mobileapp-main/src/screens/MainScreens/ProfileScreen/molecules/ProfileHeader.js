import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { colors } from "../../../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";

const ProfileHeader = ({ AuthUser }) => {
  console.log("CurrentAuth", AuthUser?.firstName);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: verticalScale(12),
        }}
      >
        {/* <ProfilePhoto addPhoto/> */}
        <View style={{ marginLeft: scale(1) }}>
          <CustomText
            label="Welcome to Cutz"
            fontFamily={"semiBold"}
            fontSize={15}
            color={colors.txtGray}
          />
          <CustomText
            label={AuthUser.firstName + " " + AuthUser.lastName}
            fontFamily={"semiBold"}
            fontSize={18}
            color={colors.txtGray}
          />
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});