import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppHeader from "../../../components/AppHeader";
import { colors } from "../../../utils/Colors";
import { icons } from "../../../../assets/icons";
import CustomText from "../../../components/CustomText";
import { Spacer } from "../../../components/Spacer";
import { Image } from "react-native-elements";
import { scale, verticalScale } from "react-native-size-matters";
import moment from "moment";

const ViewDetails = ({ navigation, route }) => {
  const { ticket } = route.params; 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  };

  if (!ticket) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader backButton onPressBack={() => navigation.goBack()} />
        <View style={{alignItems: "center"}}>
          <CustomText
              label={"EVENT DETAILS"}
              color={colors.primary}
              fontSize={20}
              fontFamily={"semiBold"}
          />
        </View>
        
        <Spacer height={10} />

        <View style={{alignItems: "center"}}>
        <CustomText
              label={"You are not registered for this event."}
              fontFamily={"semiBold"}
              color={colors.secondary}
              fontSize={15}
            />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader backButton onPressBack={() => navigation.goBack()} />
  
      <ScrollView contentContainerStyle={styles.container}>

        <View style={{alignItems: "center"}}>
          <CustomText
              label={"EVENT DETAILS"}
              color={colors.primary}
              fontSize={20}
              fontFamily={"semiBold"}
          />
        </View>
        
        <Spacer height={20} />
        
        <View style={{ flexDirection: "row" }}>
          <Spacer width={10} />
          <Image
            source={icons.calender}
            resizeMode={"contain"}
            containerStyle={{ height: scale(30), width: scale(30) }}
          />
          <Spacer width={15} />
          <View>
            <CustomText
              label={

                   moment(ticket.time.eventStartTime).utc().format("dddd") +
                    ", " +
                    moment(ticket.time.eventStartTime).utc().format("MMMM") +
                    " " +
                    moment(ticket.time.eventStartTime).utc().format("DD")

              }
              fontFamily={"semiBold"}
              color={colors.secondary}    // date & time color
              fontSize={14}
            />
            <CustomText
              label={ticket.eventGroupID?.groupHour}
              fontFamily={"semiBold"}
              color={colors.gray5}
              fontSize={12}
            />
          </View>

        </View>
        <Spacer height={25} />
        <View style={{ flexDirection: "row" }}>
          <Spacer width={10} />
          <Image
            source={icons.marker2}
            resizeMode={"contain"}
            containerStyle={{ height: scale(30), width: scale(30) }}
          />
          <Spacer width={15} />
          <View>
            <CustomText
              label={ticket.eventID.addresses[0].place}
              fontFamily={"semiBold"}
              color={colors.secondary}
              fontSize={15}
            />
            <CustomText
              label={ticket.eventID.addresses[0].house}
              fontFamily={"semiBold"}
              color={colors.gray5}
              fontSize={12}
            />
            <CustomText
              label={ticket.eventID.addresses[0].zip}
              fontFamily={"semiBold"}
              color={colors.gray5}
              fontSize={12}
            />
          </View>
        </View>

        <Spacer height={25} />
        <View style={{ flexDirection: "row" }}>
          <Spacer width={10} />
          <Image
            source={icons.ticket2f}
            resizeMode={"contain"}
            style={{
              tintColor: colors.secondary,  // ticket color
              height: scale(30),
              width: scale(30)
            }}
          />
          <Spacer width={15} />
          <View>
            <CustomText
              label={ticket.eventID.eventType}
              fontFamily={"semiBold"}
              color={colors.secondary}
              fontSize={15}
            />
          </View>
        </View>
        <Spacer height={35} />
        <View style={{ flexDirection: "row" }}>
          <Spacer width={10} />
          <Image
            source={icons.information}
            resizeMode={"contain"}
            style={{
              tintColor: colors.secondary,  // ticket color
              height: scale(30),
              width: scale(30)
            }}
          />
          <Spacer width={15} />
          <View>
            <CustomText
              label={"Additional Details:"}
              fontFamily={"semiBold"}
              color={colors.secondary}    // address color
              fontSize={15}
            />
            
          </View>
          </View>
          <Spacer height={0} />
          <Text 
            style={[
              //styles.sectionContent,
              { maxWidth: 300,
              fontFamily: "semiBold",
              color: colors.gray5,
              fontSize: 14,
              marginLeft: 59, 
            }]}>
          {ticket.eventID.additionalDetails ? ticket.eventID.additionalDetails : "No additional details"}
          </Text>
      </ScrollView>
      {/* Navigation icons go here */}
      <View style={styles.navBar}></View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 32,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  eventLabel: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.orange,
  },
  eventDate: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  eventLocation: {
    fontSize: 16,
    color: colors.text,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 24,
  },
  sectionContent: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  navBar: {
    borderTopWidth: 1,
    borderColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  // ... rest of styles/icons
});

export default ViewDetails;