import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ViewDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the ViewDetails page!</Text>
      {/* Include a button to go back if needed */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ViewDetails;