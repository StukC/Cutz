// cleaned up imports

import React, { useState } from "react";
import { ScrollView, KeyboardAvoidingView,Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import commonStyles from "../../utils/CommonStyles";
import SignupHeader from "./molecules/SignupHeader";  // common for client & volunteer
import SignupBody from "./molecules/SignupBody";
import VolunteerBody from "./molecules/VolunteerBody";


const Signup = ({ navigation,route }) => {
  const [checkUser, setCheckUser] = useState(route?.params?.checkUser);
  return (
    <SafeAreaView style={commonStyles.commonMain}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <SignupHeader setCheckUser={setCheckUser} checkUser={checkUser} navigation={navigation} />
          
          {checkUser == "Client" ? (
            <SignupBody navigation={navigation} checkUser={checkUser} />
          ) : (
            <VolunteerBody navigation={navigation} checkUser={checkUser} />
          )}
        
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;