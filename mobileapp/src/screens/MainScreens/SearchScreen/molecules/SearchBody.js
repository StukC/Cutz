import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import CustomInputs from "../../EditProfile/molecules/CustomInputs";
import { colors } from "../../../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import { icons } from "../../../../../assets/icons";
import commonStyles from "../../../../utils/CommonStyles";
import { Spacer } from "../../../../components/Spacer";
import CustomText from "../../../../components/CustomText";

const SearchBody = (props) => {
  return (
    <>
      <View style={{ paddingRight: 10 }}>
        <CustomInputs
          value={props.search}
          fontFamily={"semiBold"}
          fontSize={verticalScale(15)}
          onChangeText={props.onChangeText}
          placeholder="Enter organization"
          onRightPress={props.onRightPress}
          rigthIcon={icons.searchorg}
          placeholderTextColor={colors.placeholder}
        />
      </View>
    </>
  );
};

export default SearchBody;

const styles = StyleSheet.create({});
