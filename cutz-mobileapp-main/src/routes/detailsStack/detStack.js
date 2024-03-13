import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ReservationDetails from '../../screens/MainScreens/ReceiptScreen/Molecules/ReservationDetails'
import TicketCarousel from '../../screens/MainScreens/ReceiptScreen/Molecules/TicketCarousel'

const detStack = () => {
  const Stack=createStackNavigator()
  return (
    <Stack.Navigator  screenOptions={{headerShown:false}}>
           <Stack.Screen

            name="TicketCarousel"
            component={TicketCarousel}
        />
         <Stack.Screen

        name="ReservationDetails"
        component={ReservationDetails}
        />
    </Stack.Navigator>  


  )
}

export default detStack;

const styles = StyleSheet.create({})
