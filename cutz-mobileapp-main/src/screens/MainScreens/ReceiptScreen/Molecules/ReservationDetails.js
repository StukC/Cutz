// IN PROGRESS: TO BE COMPLETED
// PAGE NAVIGATED TO WHEN "VIEW DETAILS" IS PRESSED



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { icons } from '../../../../../assets/icons';
import { colors } from '../../../../utils/Colors';
import moment from 'moment';

const ReservationDetails = ({ ticket }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <icons.calender width={30} height={30} />
        <Text style={styles.text}>{moment(ticket.time.eventStartTime).utc().format('dddd, MMMM DD')}</Text>
      </View>
      <View style={styles.row}>
        <icons.marker2 width={30} height={30} />
        <View>
          <Text style={styles.text}>{ticket.eventID.addresses[0].place}</Text>
          <Text style={styles.text}>{ticket.eventID.addresses[0].house}</Text>
          <Text style={styles.text}>{ticket.eventID.addresses[0].zip}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <icons.ticket3 width={30} height={30} />
        <Text style={styles.text}>{ticket.eventID.eventType}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.secondary,
    fontFamily: 'semiBold',
  },
});

export default ReservationDetails;