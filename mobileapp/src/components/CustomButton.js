import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
import { ScaledSheet, verticalScale, scale, moderateScale } from 'react-native-size-matters';

// import { ActivityIndicator } from "react-native-paper";
import { colors } from '../utils/Colors';
function CustomButton({
  loading,
  title,
  onPress,
  icon,
  color,
  width,
  height,
  borderColor,
  borderRadius,
  marginTop,
  alignItems,
  justifyContent,
  borderWidth,
  backgroundColor,
  fontFamily,
  marginBottom,
  fontSize,
  btnStyle,
  marginHorizontal,
  borderTopLeftRadius,
  borderTopRightRadius,
  activeOpacity
}) {
  return (
    <TouchableOpacity
      disabled={loading}
      activeOpacity={activeOpacity||0.6}
      style={[
        {
          backgroundColor: backgroundColor || colors.primary,
          width: width || '100%',
          height: height || verticalScale(40),
          borderRadius: borderRadius,
          borderTopLeftRadius:borderTopLeftRadius,
        
          borderTopRightRadius:borderTopRightRadius,
        
          alignItems: alignItems || 'center',
          justifyContent: justifyContent || 'center',
          marginTop,
          marginBottom:marginBottom,
          marginHorizontal:marginHorizontal
        },
        btnStyle
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} size={moderateScale(26)} />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={[
              {
                color: color || colors.white,
                fontSize: verticalScale(fontSize|| 18),
                fontWeight:"600",
                fontFamily: fontFamily || "semiBold"
              },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filledButton: {
    backgroundColor: colors.primary,
  },
});

export default CustomButton;
