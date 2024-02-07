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


//noftication page shown
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
  
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

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
    console.log("Testing notification...");

    // provide some notification ID
    const notificationID = "65c3ee26c33b778fa36e30c1";

    // Fetch notification data from your backend
    const response = await fetch(`https://api/v1/notification/${notificationId}`);
    const notificationText = await response.json();

    const messaage = {
      to:expoPushToken,
      sound: "default",
      title: "My first Notfication!",
      body: notificationText,
    };
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
    // Add your notification testing logic here
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
