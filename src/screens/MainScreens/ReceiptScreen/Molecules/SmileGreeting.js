import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../utils/Colors";
import { icons } from "../../../../../assets/icons";
import CustomText from "../../../../components/CustomText";
import { Image } from "react-native-elements";
import { scale, verticalScale } from "react-native-size-matters";

const SmileGreeting = ({ setState, state ,navigate}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.blue2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomText
        label={"Please stay on this window"}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={13}
        marginBottom={10}
      />
      <CustomText
        label={"until the end of your scheduled time."}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={13}
      />
      <Image
        source={icons.smile}
        resizeMode={"contain"}
        containerStyle={{
          height: verticalScale(150),
          width: scale(150),
          marginVertical: "20%",
        }}
      />
      <CustomText
        label={"Thank you for generously Volunteering."}
        fontFamily={"semiBold"}
        color={colors.white}
        marginBottom={10}
        fontSize={14}
      />
      <CustomText
        label={"Your time, help and smiles are needed."}
        fontFamily={"semiBold"}
        color={colors.white}
        fontSize={13}
      />

      <TouchableOpacity
        onPress={() => {
          console.log("first");
          setState({
            ...state,
            checkIn: false,
            checkOut: false,
            greet: false,
            ticketDetail: false,
          });
          navigate("Welcome");
        }
          
        }
        style={{
          position: "absolute",
          right: 30,
          bottom: 40,
        }}
      >
        <Image
          source={icons.next}
          resizeMode={"contain"}
          containerStyle={{
            height: 40,
            width: 40,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SmileGreeting;

const styles = StyleSheet.create({});
