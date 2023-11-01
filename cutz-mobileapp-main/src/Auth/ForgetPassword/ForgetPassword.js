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
import commonStyles, { PH20 } from "../../utils/CommonStyles";
import { Spacer } from "../../components/Spacer";
import CustomLogo from "../../components/CustomLogo";
import ForgetBody from "./Molecules/ForgetBody";
import { scale } from "react-native-size-matters";
import { icons } from "../../../assets/icons";
const ForgetPassword = ({ navigation, route }) => {
  const email=route?.params?.email
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
          <ForgetBody
            checkUser={checkUser}
            email={email}
            setCheckUser={setCheckUser}
            navigation={navigation}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
