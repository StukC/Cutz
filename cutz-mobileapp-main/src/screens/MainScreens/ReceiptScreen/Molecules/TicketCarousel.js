// Import necessary modules and components from React and React Native
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";

// Import additional components and utilities
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

// Define TicketCarousel component
const TicketCarousel = ({
  handleCancelPress,
  handleViewDetailsPress,
  tickets,
  state,
  setState,
}) => {
  // Define state variables
  const [activeSlide, setActiveSlide] = useState(0);
  const AuthUser = useSelector((state) => state.authReducers.authState);

  // Helper function to render each ticket card
  const renderItem = ({ item, index }) => (
    <View style={[styles.cardStyle, { backgroundColor: '#ffffff' }]} key={index}>
      
      
      <Spacer height={30} />

      {/* Organization Name */}
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

      {/* Date and Time */}
      <View>
        <View style={{ flexDirection: "row" }}>
          {/* Calendar Icon */}
          <Spacer width={15} />
          <Image
            source={icons.calender}
            resizeMode={"contain"}
            containerStyle={{ height: scale(30), width: scale(30) }}
          />
          <Spacer width={10} />
          <View>
            {/* Event Date */}
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
            
            {/* Event Group Hour */}
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

        {/* Event Location */}
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
      
      {/* Event Type */}
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
            fontSize={14}
          />
        </View>
      </View>
      
      
      <Spacer height={40} />
    </View>
  );

  // Text above card
  const InfoText = () => (
    <View style={{ alignSelf: "center", alignItems: "center", marginHorizontal: 20 }}>
      <CustomText
        label={"Swipe to view your reservations. \n Ready to check in? Press the ticket icon in the top right."}
        color={colors.secondary}
        fontFamily={"semiBold"}
        textAlign="center"
        fontSize={10}
      />
    </View>
  );

  // Text below card
  const InfoText2 = () => (
    <View style={{ alignSelf: "center", alignItems: "center", marginHorizontal: 20}}>
      <CustomText
        label={"Ensure that you follow proper event procedure. \n View event details and protocol via the \"View Details\" button."}
        color={colors.secondary}
        fontFamily={"semiBold"}
        fontSize={10}
        textAlign="center"
      />
    </View>
  );


  return (
    // Main container view
    <View style={styles.container}>
      <Spacer height={20} />

      <InfoText />

      <Spacer height={20} />
      
      {/* Card */}
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
        // Display message if no tickets are available
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 22, color: "#000" }}>No Reservations Yet</Text>
        </View>
      )}

      {/* Scrolling dots */}
      <View style={{ alignSelf: "center", width: 60}}>
        <Spacer height={5} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Display pagination dots */}
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
      
      {/* Button row */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {/* View Details button */}
        <CustomButton
          title={"View Details"}
          fontFamily="bold"
          btnStyle={{
            shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
            shadowRadius: 3,
            elevation: 5,
            shadowOpacity: 2,
            shadowOffset: { width: -1, height: 3 },
          }}
          width={"40%"}
          borderRadius={15}
          fontSize={14} 
          onPress={() => {
            handleViewDetailsPress(tickets[activeSlide]);
          }}
        />

        <Spacer width={20} />

        {/* Cancel button */}
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
          width={"40%"}
          backgroundColor={colors.gray2}
          color={colors.secondary}
          borderRadius={15}
          fontSize={14} 
          onPress={() => handleCancelPress(activeSlide)}
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
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
    width: width / 8,
    overflow: "hidden",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: "#F15B27",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 9,
  },
});

export default TicketCarousel;
