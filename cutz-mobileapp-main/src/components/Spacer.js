import { View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";

export const Spacer = ({ height, width }) => (
  <View
    style={{
      width: scale(width ? width : 0),
      height: verticalScale(height ? height : 0),
    }}
  />
);
