import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../components/CustomText";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import { icons } from "../../../../assets/icons";
import { Image } from "react-native-elements";
import { images } from "../../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import commonStyles from "../../../utils/CommonStyles";

const MakeReservation = ({ navigation }) => {
  const [check, setCheck] = useState(false);
  const Header = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(20),
        paddingBottom: 10,
      }}
    >
      <Image
        source={icons.appIconNav}
        resizeMode={"contain"}
        containerStyle={{
          height: 40,
          width: 100,
        }}
      />
      <View style={{ flexDirection: "row" }}>
        {check ? (
          <>
            <Image
              source={icons.ticket2}
              resizeMode={"contain"}
              containerStyle={{
                height: 40,
                width: 40,
              }}
            />
            <Spacer width={10} />
          </>
        ) : (
          <></>
        )}
        <Image
          source={icons.bell}
          resizeMode={"contain"}
          containerStyle={{
            height: 40,
            width: 40,
          }}
        />
      </View>
    </View>
  );

  const InfoText = () => (
    <View style={{ alignSelf: "center", alignItems: "center" }}>
      <CustomText label={"REVIEW RESERVATION THEN"} color={colors.secondary} />
      <CustomText label={"CONFIRM OR CANCEL"} color={colors.secondary} />
      <Spacer height={15} />
      <CustomText
        label={"DO NOT enter the property,"}
        color={colors.secondary}
      />
      <CustomText
        label={"until the time of your reservation."}
        color={colors.secondary}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <Spacer height={40} />
      <Header />
      <View style={styles.shadowDivider} />
      <Spacer height={20} />
      <InfoText />
      <Spacer height={20} />
      <View style={styles.cardStyle}>
        <Image
          source={images.cardHeader}
          containerStyle={{ width: "100%", height: 40 }}
          resizeMode={"stretch"}
        />
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
            label={"EHH"}
            fontFamily={"semiBold"}
            color={colors.white}
            fontSize={14}
          />
        </View>
        <Spacer height={20} />
        <View>
          <View style={{ flexDirection: "row" }}>
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
          <View style={{ flexDirection: "row" }}>
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
        <Spacer height={30} />

        <View style={{ flexDirection: "row" }}>
          <Spacer width={10} />
          <Image
            source={icons.ticket1}
            resizeMode={"contain"}
            style={{ tintColor: check ? colors.secondary : colors.white }}
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

        <Image
          source={images.cardBottom}
          containerStyle={{
            width: "100%",
            height: 40,
            position: "absolute",
            bottom: 0,
          }}
          resizeMode={"stretch"}
        />
      </View>

      <Spacer height={60} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <CustomButton
          title={check ? "Proceed" : "Confirm"}
          width={"37%"}
          borderRadius={15}
          fontFamily={"bold"}
          onPress={() => {
            console.log('nav')
            // navigation.navigate("Receipt");
            // if (check) {
            //   navigation.navigate("Event");
            // } else {
            //   setCheck(true);
            // }
          }}
        />
        <Spacer width={20} />
        <CustomButton
          title={"Cancel"}
          width={"37%"}
                    fontFamily={"bold"}

          backgroundColor={colors.gray2}
          color={colors.secondary}
          borderRadius={15}
          onPress={() => {
            // navigation.navigate("Receipt")
          }}
        />
      </View>
    </View>
  );
};

export default MakeReservation;

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
    height: "45%",
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
});
