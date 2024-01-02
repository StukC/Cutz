import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, usestate } from "react";
import { scale } from "react-native-size-matters";
import { colors } from "../../../../utils/Colors";

const OTP = ({ state, setState }) => {
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
            pin2Ref.current.focus();
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
            pin3Ref.current.focus();
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
            pin4Ref.current.focus();
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

export default OTP;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  inputStyle: {
    fontSize: 40,
    fontFamily: "bold",
  },
  inputContainer: {
    width: scale(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray1,
  },
});
