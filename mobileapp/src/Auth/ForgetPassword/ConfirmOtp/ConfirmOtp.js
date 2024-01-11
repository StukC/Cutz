import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React, { useState } from "react";
  import { scale } from "react-native-size-matters";
import commonStyles from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";
import { icons } from "../../../../assets/icons";
import ConfirmOtyBody from "./ConfirmOtyBody";
  const ConfirmOtp = ({ navigation, route }) => {

    const [ state, setState ] = useState({
        pin1:"",
        pin2:"",
        pin3:"",
        pin3:"",
    })
    const [checkUser, setCheckUser] = useState(route?.params?.checkUser);
    const email=route?.params?.email
  
    return (
      <ScrollView
        accessibilityLabel="ScrollContainer"
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "white",
          flex: 1,
          height: "100%",
        }}
      >
        <SafeAreaView
          style={{ ...commonStyles.commonMain, paddingHorizontal: 20 }}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={12}
          >
                    <Spacer height={Platform.OS==='ios' ?0:40} />
  
            {/* <PH20> */}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.goBack()}
              >
                <Image
                  resizeMode="contain"
                  source={icons.back}
                  style={{ width: scale(40), height: scale(40) }}
                />
              </TouchableOpacity>
            {/* </PH20> */}
  
            {/* <Spacer height={50} /> */}
            <Spacer height={10} />
            <ConfirmOtyBody
              checkUser={checkUser}
              setCheckUser={setCheckUser}
              navigation={navigation}
              email={email}
               state={state}
                setState={setState}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  };
  
  export default ConfirmOtp;
  
  const styles = StyleSheet.create({});
  