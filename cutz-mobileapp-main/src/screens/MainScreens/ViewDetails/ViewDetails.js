import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppHeader from "../../../components/AppHeader";
import { colors } from "../../../utils/Colors";
import { icons } from "../../../../assets/icons";

const ViewDetails = ({ navigation, route }) => {
  const { ticket } = route.params; 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader backButton onPressBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eventLabel}>{ticket.eventID.eventAbbreviation}</Text>
        <Text style={styles.eventDate}>{formatDate(ticket.time.eventStartTime)}</Text>
        <Text style={styles.eventLocation}>{ticket.eventID.addresses[0].place}</Text>
        <Text style={styles.eventLocation}>{ticket.eventID.addresses[0].house}, {ticket.eventID.addresses[0].zip}</Text>
        <Text style={styles.sectionTitle}>Event Type</Text>
        <Text style={styles.sectionContent}>{ticket.eventID.eventType}</Text>
        <Text style={styles.sectionTitle}>Additional Details</Text>
        <Text style={styles.sectionContent}>{ticket.additionalDetails}</Text>
      </ScrollView>
      {}
      <View style={styles.navBar}>
        {/* Navigation icons go here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderColor: colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  // ... rest of styles/icons
});

export default ViewDetails;
