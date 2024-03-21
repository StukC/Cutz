import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import AppHeader from "../../../components/AppHeader";
import { colors } from "../../../utils/Colors";

const ViewDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Adding back button functionality explicitly */}
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
    backgroundColor: colors.white,
  },
  content: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  // ... other styles
});

export default ViewDetails;
