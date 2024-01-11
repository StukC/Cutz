import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppDescription from "../../screens/MainScreens/AppDescription/AppDescription";
import PersonalScreen from '../../screens/MainScreens/PersonalScreen/PersonalScreen'
import EditProfile from '../../screens/MainScreens/EditProfile/EditProfile'
import ManageNotification from '../../screens/MainScreens/ManageNotification/ManageNotification'
import ProfileScreen from '../../screens/MainScreens/ProfileScreen/PofileScreen'


const ProfileStack = () => {
  const Stack=createStackNavigator()
  return (
    <Stack.Navigator  screenOptions={{headerShown:false}}>
          <Stack.Screen

      name="ProfileScreen"
      component={ProfileScreen}
    />
         <Stack.Screen

        name="PersonalScreen"
        component={PersonalScreen}
      />
      <Stack.Screen

        name="EditProfile"
        component={EditProfile}
      />

        <Stack.Screen

        name="AppDescription"
        component={AppDescription}
      />


    </Stack.Navigator>


  )
}

export default ProfileStack

const styles = StyleSheet.create({})
