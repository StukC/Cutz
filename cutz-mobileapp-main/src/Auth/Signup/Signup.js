import { ScrollView, StyleSheet, Text, View,KeyboardAvoidingView,Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyles from "../../utils/CommonStyles";
import SignupHeader from "./molecules/SignupHeader";
import SignupBody from "./molecules/SignupBody";
import SignupBottom from "./molecules/SignupBottom";
import VolunteerBody from "./molecules/VolunteerBody";
const Signup = ({ navigation,route }) => {
  const [checkUser, setCheckUser] = useState(route?.params?.checkUser);
  // const checkUserRoute=route?.params?.checkUser
  return (

    <SafeAreaView style={commonStyles.commonMain}>
          <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="height"
  
    // keyboardVerticalOffset={12}
  >

     
      <ScrollView showsVerticalScrollIndicator={false}>

     

        <SignupHeader
          setCheckUser={setCheckUser}
          checkUser={checkUser}
          navigation={navigation}
          // checkUserRoute={checkUserRoute}
        />
        {checkUser == "Client" ? (
          <SignupBody 
          navigation={navigation}
          checkUser={checkUser} />
        ) : (
          <VolunteerBody 
          navigation={navigation}
          checkUser={checkUser}
          />
        )}

      </ScrollView>
      </KeyboardAvoidingView>


    </SafeAreaView>

  );
};

export default Signup;

const styles = StyleSheet.create({});
