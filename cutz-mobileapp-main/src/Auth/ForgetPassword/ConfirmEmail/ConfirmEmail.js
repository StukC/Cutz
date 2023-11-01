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
import CustomLogo from "../../../components/CustomLogo";
import { icons } from "../../../../assets/icons";
import ConfirmEmailBody from "./ConfirmEmailBody";
  const ConfirmEmail = ({ navigation, route }) => {
    const [checkUser, setCheckUser] = useState(route?.params?.checkUser);
  
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
            <ConfirmEmailBody
              checkUser={checkUser}
              setCheckUser={setCheckUser}
              navigation={navigation}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  };
  
  export default ConfirmEmail;
  
  const styles = StyleSheet.create({});
  