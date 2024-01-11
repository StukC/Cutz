import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, usestate } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../utils/Colors";

const CustomOtp = ({ state, setState }) => {
  const pin1Ref = useRef("");
  const pin2Ref = useRef("");
  const pin3Ref = useRef("");
  const pin4Ref = useRef("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin1Ref}
          placeholder={"0"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          value={state.pin1}
          onChangeText={(v) => {
            // console.log(v)
            setState({ ...state, pin1: v });
            if (v) {
              pin2Ref.current.focus();
              return;
            }
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin2Ref}
          placeholder={"0"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          value={state.pin2}
          onChangeText={(v) => {
            setState({ ...state, pin2: v });
            if (v) {
              pin3Ref.current.focus();
              return;
            }
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin3Ref}
          placeholder={"0"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          value={state.pin3}
          onChangeText={(v) => {
            setState({ ...state, pin3: v });
            if (v) {
              pin4Ref.current.focus();
              return;
            }
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={pin4Ref}
          placeholder={"0"}
          placeholderTextColor={colors.perFectDark}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.inputStyle}
          value={state.pin4}
          onChangeText={(v) => {
            setState({ ...state, pin4: v });
          }}
        />
      </View>
    </View>
  );
};

export default CustomOtp;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    // backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputStyle: {
    paddingLeft: 12,
    marginTop: 10,
    //   paddingTop:15
    fontSize: verticalScale(23),
    // padding:
    fontFamily: "bold",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    //   color: colors.perFectDark,
    // backgroundColor: colors.gray1,
    // paddingHorizontal: 10,
    // marginLeft:spacer?10:0,
  },
  inputContainer: {
    width: scale(40),
    height: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray1,
    //   color: colors.perFectDark,
    // paddingHorizontal: 10,
    // marginLeft:spacer?10:0,
  },
});
