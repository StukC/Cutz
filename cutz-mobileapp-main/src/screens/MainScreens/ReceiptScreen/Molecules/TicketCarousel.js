import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image } from "react-native-elements";
import { scale, verticalScale } from "react-native-size-matters";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { icons } from "../../../../../assets/icons";
import { images } from "../../../../../assets/images";
import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import { Spacer } from "../../../../components/Spacer";
import { colors } from "../../../../utils/Colors";
import moment from "moment";
import { getOrganizationById } from "../../../../services/Organization";
import { getTimingBy } from "../../../../services/Timing";
import { useSelector } from "react-redux";


const { width } = Dimensions.get("window");
const TicketCarousel = ({
  handleCancelPress,
  handleProceedPress,
  tickets,
  state,
  setState,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const AuthUser = useSelector((state) => state.authReducers.authState);


  const renderItem = ({ item, index }) => (
    <View style={styles.cardStyle} key={index}>
      <Image
        source={images.cardHeader}
        containerStyle={{ width: "100%", height: 40 }}
        resizeMode={"stretch"}
      />

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
          label={item?.eventID.orgId?.organizationName}
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

                   moment(item.time.eventStartTime).utc().format("dddd") +
                    ", " +
                    moment(item.time.eventStartTime).utc().format("MMMM") +
                    " " +
                    moment(item.time.eventStartTime).utc().format("DD")

              }
              fontFamily={"semiBold"}
              color={colors.secondary}
              fontSize={14}
            />
            
            {AuthUser.clientStatus ? (
              <CustomText
                label={item.eventGroupID?.groupHour}
                fontFamily={"semiBold"}
                color={colors.perFectDark}
                fontSize={11}
              />
            ) : (
              <CustomText
                label={
                  "PREP " +
                  moment(item.time.priorEventStartTime).utc().format("hh:mm A") +
                  " - " +
                  moment(item.time.priorEventEndTime).utc().format("hh:mm A")
                }
                fontFamily={"semiBold"}
                color={colors.secondary}
                fontSize={11}
              />
            )}
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
              label={item.eventID.addresses[0].place}
              fontFamily={"semiBold"}
              color={colors.secondary}
              fontSize={14}
            />
            <CustomText
              label={item.eventID.addresses[0].house}
              fontFamily={"semiBold"}
              color={colors.perFectDark}
              fontSize={11}
            />
            <CustomText
              label={item.eventID.addresses[0].zip}
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
            label={item.eventID.eventType}
            fontFamily={"bold"}
            color={colors.secondary}
            fontSize={16}
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
      <Spacer height={40} />
    </View>
  );

  const InfoText = () => (
    <View style={{ alignSelf: "center", alignItems: "center", marginHorizontal: 20 }}>
      <CustomText
        label={"Swipe between tickets to view your reservations. \n Ready to check in? Press the ticket icon in the top right."}
        color={colors.secondary}
        fontFamily={"semiBold"}
        textAlign="center"
      />
    </View>
  );

  const InfoText2 = () => (
    <View style={{ alignSelf: "center", alignItems: "center", marginHorizontal: 20}}>
      <CustomText
        label={"Ensure that you follow proper event procedure. \n View event details and protocol via the \"View Details\" button."}
        color={colors.secondary}
        fontFamily={"semiBold"}
        fontSize={9}
        textAlign="center" // Set text alignment to center
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Spacer height={20} />
      <InfoText />
      <Spacer height={20} />
      {tickets.length ? (
        <Carousel
          data={tickets}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width / 1.3}
          layout="default"
          inactiveSlideScale={0.85} // set inactive slide scale to make items smaller
          onSnapToItem={(index) => {
            setActiveSlide(index);
            setState({ ...state, currentTicket: tickets[index] });

          }} // update the active slide index
        />
      ) : (
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 22, color: "#000" }}>Not Found</Text>
        </View>
      )}

      <View style={{ alignSelf: "center" ,width:90}}>
        <Spacer height={15} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tickets.map((item, index) => (
            <View
              style={{
                ...styles.dot,
                backgroundColor: activeSlide === index ? "black" : "grey",
              }}
            />
          ))}
        </ScrollView>
      </View>

      <Spacer height={20} />

      <InfoText2 />

      <Spacer height={20} />

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <CustomButton
        title={"View Details"}
        fontFamily="bold"
        btnStyle={{
          shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
          shadowRadius: 2,
          elevation: 5,
          shadowOpacity: 0.4,
          shadowOffset: { width: -1, height: 3 },
        }}
        width={"40%"}
        borderRadius={15}
        onPress={() => {
          handleProceedPress(tickets[activeSlide]);
        }}
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
          inputMarginTop:-20,
          shadowOffset: { width: -1, height: 3 },
        }}
        width={"37%"}
        backgroundColor={colors.gray2}
        color={colors.secondary}
        borderRadius={15}
        onPress={handleCancelPress}
      />
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  pagination: {
    // position: "absolute",
    // bottom: 0,
    paddingVertical: 10,
    width: width / 8,
    overflow: "hidden",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // backgroundColor: colors.black,
    marginHorizontal: 10,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "grey",
  },
  cardStyle: {
    width: width / 1.3,
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
});

export default TicketCarousel;
