import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import AppHeader from "../../../components/AppHeader";
import { colors } from "../../../utils/Colors";

const ViewDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Pass the required props to AppHeader, such as backButton */}
      <AppHeader backButton onPressBack={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerText}>EH Event</Text>
          {/* Event details and other components */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ViewDetails;
