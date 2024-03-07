import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
//   import CustomText from "../../../components/CustomText";
//   import { Spacer } from "../../../components/Spacer";
//   import { colors } from "../../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
//   import { icons } from "../../../../assets/icons";
import { Avatar, Image } from "react-native-elements";
//   import { images } from "../../../../assets/images";
//   import CustomButton from "../../../components/CustomButton";
//   import commonStyles from "../../../utils/CommonStyles";
//   import TicketCheckInAndOut from "./Molecules/TicketCheckInAndOut";
//   import InputItem from "./Molecules/InputItem";
//   import ThumbGreeting from "./Molecules/ThumbGreeting";
//   import SmileGreeting from "./Molecules/SmileGreeting";
import AppHeader from "../../../../components/AppHeader";
import { Spacer } from "../../../../components/Spacer";
import CustomText from "../../../../components/CustomText";
import { images } from "../../../../../assets/images";
import { colors } from "../../../../utils/Colors";
import { icons } from "../../../../../assets/icons";
import CustomButton from "../../../../components/CustomButton";
import moment from "moment";

const TicketDetails = ({
  userType,
  handleConfirmPress,
  handleCancelPress,
  handleProceedPress,
  navigate,
  cardBtnText,
  ticketData,
                         state
}) => {
  const [check, setCheck] = useState(false);

  const InfoText = () => (
    <View style={{ alignSelf: "center", alignItems: "center" }}>
      {userType === "Client" ? (
        <>
          <CustomText
            label={"REVIEW RESERVATION THEN"}
            color={colors.secondary}
            fontFamily={"semiBold"}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText
              label={"CONFIRM OR CANCEL"}
              color={colors.secondary}
              fontFamily={"semiBold"}
            />
          </View>

          <Spacer height={15} />
          <CustomText
            label={"DO NOT enter the property,"}
            color={colors.secondary}
            fontFamily={"semiBold"}
          />
          <CustomText
            label={"until the time of your reservation."}
            color={colors.secondary}
            fontFamily={"semiBold"}
          />
        </>
      ) : (
        <>
          <CustomText
            label={"REVIEW RESERVATION THEN"}
            color={colors.secondary}
            fontSize={13}
            fontFamily={"semiBold"}
          />
          <CustomText
            label={"CONFIRM OR CANCEL"}
            color={colors.secondary}
            fontSize={13}
            fontFamily={"semiBold"}
          />
           <Spacer height={20}/>
          <CustomText
            label={"DO NOT ENTER THE PROPERTY,"}
            color={colors.secondary}
            fontSize={13}
            fontFamily={"semiBold"}
          />
           <CustomText
            label={"UNTIL THE TIME OF YOUR RESERVATION."}
            color={colors.secondary}
            fontSize={13}
            fontFamily={"semiBold"}
          />
        </>
      )}
    </View>
  );
  return (
    <View style={styles.container}>
      {/* <Spacer height={Platform.OS == "ios" ? 40 : 30} /> */}
      {/* <Header /> */}
      {/* <View style={styles.shadowDivider} /> */}
      <Spacer height={10} />

      <>
        <InfoText />
        <Spacer height={userType === "Client" ? 20 : !check ? 35 : 20} />
        <View style={styles.cardStyle}>
          
          <Spacer height={10} />
          <View
            style={{
              paddingHorizontal: scale(50),
              paddingVertical: verticalScale(5),
              backgroundColor: colors.darkOrange,
              alignSelf: "center",
              borderRadius: 5,
            }}
          >
            <CustomText
              label={ticketData?.organization}
              fontFamily={"semiBold"}
              color={colors.white}
              fontSize={14}
            />
          </View>
          <Spacer height={20} />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Spacer width={15} />
              <Image
                source={icons.calender}
                resizeMode={"contain"}
                containerStyle={{ height: scale(30), width: scale(30) }}
              />
              <Spacer width={10} />
              <View>
                <CustomText
                  label={
                    moment(ticketData?.eventStartTime).utc().format("dddd") +
                    ", " +
                    moment(ticketData?.eventStartTime).utc().format("MMMM") +
                    " " +
                    moment(ticketData?.eventStartTime).utc().format("DD")
                  }
                  fontFamily={"semiBold"}
                  color={colors.secondary}
                  fontSize={14}
                />
                <CustomText
                  label={ticketData?.groupHour}
                  fontFamily={"semiBold"}
                  color={colors.perFectDark}
                  fontSize={11}
                />
              </View>
            </View>
            <Spacer height={25} />
            <View style={{ flexDirection: "row" }}>
              <Spacer width={10} />
              <Image
                source={icons.marker}
                resizeMode={"contain"}
                containerStyle={{ height: scale(30), width: scale(30) }}
              />
              <Spacer width={15} />
              <View>
                <CustomText
                  label={ticketData?.addresses[0].place}
                  fontFamily={"semiBold"}
                  color={colors.secondary}
                  fontSize={14}
                />
                <CustomText
                  label={ticketData?.addresses[0].house}
                  fontFamily={"semiBold"}
                  color={colors.perFectDark}
                  fontSize={11}
                />
                <CustomText
                  label={ticketData?.addresses[0].zip}
                  fontFamily={"semiBold"}
                  color={colors.perFectDark}
                  fontSize={11}
                />
              </View>
            </View>
          </View>
          <Spacer height={15} />

          <View style={{ flexDirection: "row" }}>
            <Spacer width={10} />
            <Image
              source={icons.ticket1}
              resizeMode={"contain"}
              style={{
                tintColor: colors.secondary,
              }}
              containerStyle={{ height: scale(30), width: scale(30) }}
            />
            <Spacer width={15} />
            <View>
              <CustomText
                label={ticketData?.eventType}
                fontFamily={"bold"}
                color={colors.secondary}
                fontSize={14}
              />
            </View>
          </View>

        
          <Spacer height={40} />
        </View>

        <Spacer height={40} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: verticalScale(20),
          }}
        >
          <CustomButton
            title={cardBtnText}
            fontFamily="bold"
            btnStyle={{
              shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
              shadowRadius: 2,
              elevation: 5,
              shadowOpacity: 0.4,
              // inputMarginTop:-20,
              shadowOffset: { width: -1, height: 3 },
            }}
            width={"37%"}
            borderRadius={15}
            onPress={handleConfirmPress}
          />
          <Spacer width={20} />
          <CustomButton
            title={"Cancel"}
            fontFamily="bold"
            btnStyle={{
              shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
              shadowRadius: 2,
              elevation: 5,
              shadowOpacity: 0.4,
              // inputMarginTop:-20,
              shadowOffset: { width: -1, height: 3 },
            }}
            width={"37%"}
            backgroundColor={colors.gray2}
            color={colors.secondary}
            borderRadius={15}
            onPress={handleCancelPress}
          />
        </View>
      </>
    </View>
  );
};

export default TicketDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  shadowDivider: {
    width: "100%",
    height: 2,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 9,
  },
  cardStyle: {
    width: "80%",
    // height: "65%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 9,
  },
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
