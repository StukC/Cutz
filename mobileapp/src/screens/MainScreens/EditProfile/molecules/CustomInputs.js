import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../../../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import commonStyles from "../../../../utils/CommonStyles";
import CustomText from "../../../../components/CustomText";

const CustomInputs = (props) => {
  return (
    <View
      style={{
        width: props.width || "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1.2,
          borderBottomColor: colors.black,
        }}
      >
        <TextInput
          onPressIn={props.onInputPress}
          editable={props.editable}
          style={[
            {
              width: props.rigthIcon ? "90%" : "99%",
              height: props.inputHeight || "100%",
              paddingRight: props.paddingRight || 10,
              paddingHorizontal: props.paddingHorizontal,
              fontFamily: props.fontFamily || "regular",
              color: props.color || colors.black,
              fontSize: props.fontSize || verticalScale(13)
            },
          ]}
          onChangeText={props.onChangeText}
          value={props.value}
          numberOfLines={props.numberOfLines}
          keyboardType={props.keyboardType}
          autoCapitalize="none"
          multiline={props.multiline}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor || colors.secondary}
          secureTextEntry={props.secureTextEntry}
        />

        {props.rigthIcon ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onRightPress}
            style={{
              width: props.iconWidth || scale(20),
              height: props.iconHeight || verticalScale(20),
              marginRight: verticalScale(10),
            }}>
            <Image
              style={commonStyles.img}
              resizeMode="contain"
              source={props.rigthIcon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      {props.error && (
        <CustomText
          marginTop={5}
          fontSize={9}
          label={props.error}
          color={colors.red}
        />
      )}
    </View>
  );
};

export default CustomInputs;

const styles = StyleSheet.create({});
