import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Spacer } from "../../../../components/Spacer";
import { Image } from "react-native-elements";
import CustomText from "../../../../components/CustomText";
import { icons } from "../../../../../assets/icons";
import { colors } from "../../../../utils/Colors";
import CustomButton from "../../../../components/CustomButton";
import InputItem from "./InputItem";
import { verticalScale } from "react-native-size-matters";
import OTP from "./OTP";
import moment from "moment";
import { useIsFocused, useNavigation } from "@react-navigation/native";
const currentDate = new Date().toString();

const TicketCheckInAndOutVol = ({ state, setState,  }) => {
  const isFocused = useIsFocused();
  const { navigate } = useNavigation();

  useEffect(() => {
    console.log(moment(state?.time?.eventStartTime).utc().format("YYYY-MM-DD"));
    console.log(moment(currentDate).utc().format("YYYY-MM-DD"));
    console.log(moment(currentDate).add(3,'hours').utc().format("hh:mm A"));
    console.log(
      moment(state?.time?.eventStartTime)
        .subtract(10, "minutes")
        .utc()
        .format("hh:mm A")
    );
    // if (isFocused) {
    //   if (
    //     moment(state?.time?.eventStartTime).utc().format("YYYY-MM-DD") ==
    //       moment(currentDate).utc().format("YYYY-MM-DD") &&
    //     moment(currentDate).utc().format("hh:mm A") >
    //       moment(state?.time?.eventStartTime)
    //         .subtract(10, "minutes")
    //         .utc()
    //         .format("hh:mm A")
    //   ) {
    //     console.log("its time");
    //   } else {
    //     navigate("Receipt");
    //   }
    // }
  }, [isFocused]);

  return moment(state?.time?.eventStartTime).utc().format("YYYY-MM-DD") ===
    moment(currentDate).utc().format("YYYY-MM-DD") &&
    moment(currentDate).add(3,'hours').utc().format("hh:mm A") >
      moment(state?.time?.eventStartTime) 
        .subtract(10, "minutes")
        .utc()
        .format("hh:mm A") ? (
    <View>
      <Spacer height={40} />
      <View style={{ alignItems: "center" }}>
        <View style={{ marginRight: 40 }}>
          <View style={{ flexDirection: "row", marginLeft: 5 }}>
            <Spacer width={10} />
            <Image
              source={icons.calender}
              resizeMode={"contain"}
              containerStyle={{ height: 40, width: 40 }}
            />
            <Spacer width={15} />
            <View>
              <CustomText
                label={"Friday, January 20"}
                fontFamily={"semiBold"}
                color={colors.secondary}
                fontSize={14}
              />
              <CustomText
                label={"1:00 PM"}
                fontFamily={"semiBold"}
                color={colors.perFectDark}
                fontSize={11}
              />
            </View>
          </View>
          <Spacer height={20} />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Spacer width={10} />
            <Image
              source={icons.marker}
              resizeMode={"contain"}
              containerStyle={{ height: 40, width: 40 }}
            />
            <Spacer width={15} />
            <View>
              <CustomText
                label={"THURSTON HIGH SCHOOL"}
                fontFamily={"semiBold"}
                color={colors.secondary}
                fontSize={14}
              />
              <CustomText
                label={"26255 Schoolcraft St "}
                fontFamily={"semiBold"}
                color={colors.perFectDark}
                fontSize={11}
              />
              <CustomText
                label={"Redford Charter Twp, MI 48239"}
                fontFamily={"semiBold"}
                color={colors.perFectDark}
                fontSize={11}
              />
            </View>
          </View>
        </View>
        <Spacer height={20} />

        <View
          style={{
            flexDirection: "row",
            marginRight: 20,
            alignItems: "center",
          }}
        >
          <Spacer width={10} />
          <Image
            source={icons.ticket1}
            resizeMode={"contain"}
            style={{
              tintColor: colors.secondary,
            }}
            containerStyle={{ height: 40, width: 40 }}
          />
          <Spacer width={15} />
          <View>
            <CustomText
              label={"FOOD DISTRIBUTION "}
              fontFamily={"bold"}
              color={colors.secondary}
              fontSize={18}
            />
          </View>
        </View>
        <Spacer height={30} />
        <View>
          <View style={styles.voucherBody}>
            <View style={styles.voucherHeader}>
              <CustomText
                label={"Check In"}
                color={colors.white}
                fontFamily={"semiBold"}
                fontSize={16}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Spacer height={20} />
              <CustomText
                label={"Admin Use"}
                color={colors.secondary}
                fontFamily={"semiBold"}
                fontSize={16}
              />
              <Spacer height={20} />
              <OTP state={state} setState={setState} />
              
            </View>
            <Spacer height={10} />
            <View style={{ alignItems: "center" }}>
              <CustomButton
                title={state.checkIn ? "Done" : "All Set!"}
                width={"50%"}
                btnStyle={{
                  shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
                  shadowRadius: 2,
                  elevation: 5,
                  shadowOpacity: 0.4,
                  // inputMarginTop:-20,
                  shadowOffset: { width: -1, height: 3 },
                }}
                height={40}
                borderRadius={15}
                backgroundColor={colors.btnDark}
                onPress={() => {
                  
                  let eventCode =
                    state.pin1 + state.pin2 + state.pin3 + state.pin4;
                  console.log(eventCode, state?.currentTicket?.eventCode);
                  if (!state.checkIn) {
                    if (eventCode === state?.currentTicket?.eventCode) {
                      setState({
                        ...state,
                        checkIn: true,
                        greet: true,
                        pin1: "",
                        pin2: "",
                        pin3: "",
                        pin4: "",
                      });
                    } else {
                      alert("Invalid Code");
                    }
                  } else {
                    if (
                      moment(currentDate).add(3,'hours').utc().format("hh:mm A") >
                      moment(state?.time?.eventEndTime).utc().format("hh:mm A")
                    ) {
                      if (eventCode === state?.currentTicket?.eventCode) {
                        setState({
                          ...state,
                          checkOut: true,
                          greet: true,
                          pin1: "",
                          pin2: "",
                          pin3: "",
                          pin4: "",
                        });
                      } else {
                        alert("Invalid Code");
                      }
                    } else {
                      console.log(state.time.eventEndTime)
                      alert("There is still some time left");
                    }
                  }
                  // modelClose();
                }}
              />
              <Spacer height={10} />
            </View>
          </View>
        </View>
        <Spacer height={10} />
        <TouchableOpacity
          style={{ width: "75%" }}
          onPress={() =>
            setState({
              ...state,
              ticketDetail: false,
              pin1: "",
              pin2: "",
              pin3: "",
              pin4: "",
            })
          }
        >
          <Image
            source={icons.back}
            containerStyle={{
              height: 50,
              width: 50,
              alignSelf: "flex-start",
            }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22 }}>Time Not Reached</Text>
    </View>
  );
};

export default TicketCheckInAndOutVol;

const styles = StyleSheet.create({
  voucherContainer: {
    // alignItems: "center",
  },
  voucherHeader: {
    // width:300,
    height: verticalScale(40),
    // width: "100%",
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
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 9,
  },
});
