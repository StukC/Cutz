import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { colors } from "../../../../utils/Colors";
import { icons } from "../../../../../assets/icons";
import commonStyles, { PH20,PH10 } from "../../../../utils/CommonStyles";
import SepratorLine from "../../../../components/SepratorLine";
import { Spacer } from "../../../../components/Spacer";
import ProfileBody from "../../ProfileScreen/molecules/ProfileBody";
import NotificationContainer from "./NotificationContainer";
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationBody = ({ setModalVisible }) => {
  const profileData = [
    {
      id: 1,
      name: "Push Notification",
      img: icons.person,
      //   onPress: () => navigation.navigate("PersonalScreen"),
    },
    
  ];

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    console.log("sending push notfications...");
    registerForPushNotificationsAsync().then(token => {
      console.log("token: " , token);
      setExpoPushToken(token);
    }).catch((err) => console.log(err));


  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: "55e5ea50-e263-4d2d-9078-415cf6eb7c8e" })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }
    // testing button
    const handleTestNotification = async () => {
      console.log("sending push notfication..");

      console.log("Testing notification...");

      // provide some notification ID
      const notificationID = "65aec1ae4e4f22f7e224ddf5";

      console.log("before (get) fetch");

      // Fetch notification data from your backend
      //adjust url to check its working on ur end
      const response = await fetch(`http://10.0.0.116:3006/api/v1/notification/${notificationID}`);
      const notificationData = await response.json();

      // Extract the notification text from the response data
      const notificationText = notificationData.notificationText;

      console.log("notificationText = ", notificationText);

      console.log("after (get) fetch");

    const messaage = {
      to:expoPushToken,
      sound: "default",
      icon:"./assets/icons/appIconNav.png",
      title: "My first Notfication!",
      body: notificationText,
    };

    console.log(messaage);
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(messaage),
      });
    };

  return (
    <>
      <PH10>
        <Spacer height={10}/>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setModalVisible(false)}
          >
            <Image source={icons.cross} style={commonStyles.imgContainer} />
          </TouchableOpacity>

          <CustomText
            color={colors.primary}
            fontSize={18}
            fontFamily="medium"
            marginLeft={10}
            label="Notifications"
          />
        </View>
      </PH10>
      <Spacer height={15} />

      <SepratorLine
        height={2}
        backgroundColor={colors.gray1}
        style={{
          shadowColor: Platform.OS == "ios" ? colors.gray : colors.black,
          shadowRadius: 2,
          elevation: 1,
          shadowOpacity: 0.4,
          // inputMarginTop:-20,
          shadowOffset: { width: -1, height: 1 },
        }}
      />
      <Spacer height={1} />
      <PH10>
        <CustomText
          color={"#838383"}
          fontSize={13}
          fontFamily="medium"
          marginTop={15}
          marginBottom={15}
          label="Notification"
        />
      </PH10>
      <SepratorLine backgroundColor={"#C9C9C9"} />

      {profileData.map((item) => {
        return (
          <>
            <NotificationContainer
              name={item.name}
              img={item.img}
              enable
              onPress={item.onPress}
              family={item?.family}
            />
            <SepratorLine backgroundColor={"#C9C9C9"} />
          </>
        );
      })}
       {/*for testing button */}
       <TouchableOpacity onPress={handleTestNotification} style={styless.testButton}>
        <CustomText
          color={colors.primary}
          fontSize={18}
          fontFamily="medium"
          label="Test Notification"
        />
      </TouchableOpacity>
    </>
  );
};

//for testing button
const styless = StyleSheet.create({
  testButton: {
    backgroundColor: colors.secondary, // Change to your desired color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default NotificationBody;

const styles = StyleSheet.create({});
