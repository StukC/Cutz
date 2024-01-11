import { View, Text } from "react-native";
import React from "react";
import { colors } from "../utils/Colors";

const SepratorLine = (props) => {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: props.height || 1,
          backgroundColor: props.backgroundColor || "#757575",
        },
        props.style,
      ]}
    ></View>
  );
};

export default SepratorLine;
