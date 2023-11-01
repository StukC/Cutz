import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef,useState } from "react";
import { colors } from "./src/utils/Colors";
import { scale } from "react-native-size-matters";

const Test = () => {
  const pin1Ref = useRef("");
  const pin2Ref = useRef("");
  const pin3Ref = useRef("");
  const pin4Ref = useRef("");

  const [pin, setPin] = React.useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin1Ref}
          placeholder={"1"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          onChange={(v) => {
            setPin({ ...pin, pin1: v });
            // if (pin.pin1 !== "") {
              pin2Ref.current.focus();
            // }
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin2Ref}
          placeholder={"1"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          onChange={(v) => {
            setPin({ ...pin, pin2: v });
            if (pin.pin2 !== "") {
              pin3Ref.current.focus();
            }
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin3Ref}
          placeholder={"1"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          onChange={(v) => {
            setPin({ ...pin, pin3: v });
            if (pin.pin3 !== "") {
              pin4Ref.current.focus();
            }
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin4Ref}
          placeholder={"1"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          onChange={(v) => setPin({ ...pin, pin4: v })}
        />
      </View>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputStyle: {
    fontSize: 40,
    fontFamily: "bold",
    //   color: colors.perFectDark,
    // backgroundColor: colors.gray1,
    // paddingHorizontal: 10,
    // marginLeft:spacer?10:0,
  },
  inputContainer: {
    width: scale(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray1,
    //   color: colors.perFectDark,
    // paddingHorizontal: 10,
    // marginLeft:spacer?10:0,
  },
});
