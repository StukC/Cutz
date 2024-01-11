import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Signup from '../../Auth/Signup/Signup'
import Login from '../../Auth/Login/Login'
import ForgetPassword from '../../Auth/ForgetPassword/ForgetPassword'

const AuthStack = () => {
  const Stack=createStackNavigator()
  return (
    <Stack.Navigator  screenOptions={{headerShown:false}}>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="signup" component={Signup}/>
      <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>

    </Stack.Navigator>
    
    
  )
}

export default AuthStack

const styles = StyleSheet.create({})