import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/Colors";
import { Image } from "react-native-elements";
import { icons } from "../../../../assets/icons";
import { Spacer } from "../../../components/Spacer";
import OTP from "../ReceiptScreen/Molecules/OTP";
import { scale, verticalScale } from "react-native-size-matters";
import CustomButton from "../../../components/CustomButton";
import { images } from "../../../../assets/images";
import {
  updateCheckInAndCheckOutClient,
  updateCheckInAndCheckOutVolunteer
} from "../../../services/Reservation";
import {useSelector} from "react-redux";

const TicketOtp = ({ route: { params } }) => {

  const AuthUser = useSelector((state) => state.authReducers.authState);

  const { setState, state, navigation } = params;
  const pin1Ref = useRef("");
  const pin2Ref = useRef("");
  const pin3Ref = useRef("");
  const pin4Ref = useRef("");

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  return (
    <ImageBackground source={images.ticketBackground} style={styles.container}>
      <View style={styles.voucherContainer}>
        <View style={styles.voucherBody}>
          <View style={styles.voucherHeader}>
            <CustomText
              label={state.currentTicket?.checkIN ?"Check Out":"Check In"}
              color={colors.white}
              fontFamily={"semiBold"}
              fontSize={16}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Receipt")}
              style={{ position: "absolute", right: 20 }}
            >
              <Image
                source={icons.close}
                containerStyle={{
                  height: verticalScale(12),
                  width: verticalScale(12),
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <Spacer height={20} />
            <CustomText
              label={"Admin — Enter Code"}
              color={colors.secondary}
              fontFamily={"regular"}
              fontSize={16}
            />
            <Spacer height={20} />
            {/* OTP */}
            <View style={styles.container1}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={pin1Ref}
                  placeholder={"0"}
                  placeholderTextColor={colors.perFectDark}
                  keyboardType={"number-pad"}
                  maxLength={1}
                  style={styles.inputStyle}
                  value={pin1}
                  onChangeText={(v) => {
                    // console.log(v)
                    setPin1(v);
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
                  value={pin2}
                  onChangeText={(v) => {
                    setPin2(v);
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
                  value={pin3}
                  onChangeText={(v) => {
                    setPin3(v);
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
                  value={pin4}
                  onChangeText={(v) => {
                    setPin4(v);
                  }}
                />
              </View>
            </View>
          </View>
          <Spacer height={30} />
        </View>
        <Spacer height={20} />
        <CustomButton
          title={state.currentTicket?.checkIN ?"Next":"All Set"}
          width={scale(160)}
          fontFamily={"bold"}
          btnStyle={{
            shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
            shadowRadius: 2,
            elevation: 5,
            shadowOpacity: 0.4,
            // inputMarginTop:-20,
            shadowOffset: { width: -1, height: 3 },
          }}
          borderRadius={12}

          onPress={() => {
            let eventCode = pin1 + pin2 + pin3 + pin4;
            if (!state.checkIN) {
              if (+eventCode === +state?.eventID?.checkInCode) {
                setPin1("");
                setPin2("");
                setPin3("");
                setPin4("");
                if (AuthUser.clientStatus) {
                  updateCheckInAndCheckOutClient({checkIN: Date()}, AuthUser.token, state._id).then((data) => {
                    navigation.navigate("Receipt");
                  })
                }else{
                  updateCheckInAndCheckOutVolunteer({checkIN: Date()}, AuthUser.token, state._id).then((data) => {
                    navigation.navigate("Receipt");
                  })
                }
              } else {
                alert("Invalid check-in Code");
              }
            } else {
              if (+eventCode === +state?.eventID?.checkOutCode) {
                setPin1("");
                setPin2("");
                setPin3("");
                setPin4("");
                if (AuthUser.clientStatus) {
                  updateCheckInAndCheckOutClient({checkOut: Date()}, AuthUser.token, state._id).then((data) => {
                    navigation.navigate("Receipt");
                  })
                }else{
                  updateCheckInAndCheckOutVolunteer({checkOut: Date()}, AuthUser.token, state._id).then((data) => {
                    navigation.navigate("Receipt");
                  })
                }

              } else {
                alert("Invalid check-out Code");
              }
              // } else {
              //   alert("There is still some time left");
              // }
            }
            // setState({ ...state, pin1: "", pin2: "", pin3: "", pin4: "" });

            // setTimeout(() => {
            //   setState({ ...state, pin1: "", pin2: "", pin3: "", pin4: "" })
            // }, 1000);
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default TicketOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  voucherContainer: {
    alignItems: "center",
  },
  voucherHeader: {
    height: verticalScale(40),
    // width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 9,
  },
  voucherBody: {
    // height: verticalScale(100),
    width: "75%",
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
    shadowRadius: 2,
    elevation: 5,
    shadowOpacity: 0.4,
    // inputMarginTop:-20,
    shadowOffset: { width: -1, height: 3 },
  },
  container1: {
    // flex: 1,
    width: "80%",
    // backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
