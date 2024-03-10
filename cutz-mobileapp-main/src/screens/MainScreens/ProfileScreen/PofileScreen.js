import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import ProfileHeader from "./molecules/ProfileHeader";
import SepratorLine from "../../../components/SepratorLine";
import { icons } from "../../../../assets/icons";
import ProfileBody from "./molecules/ProfileBody";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../utils/Colors";
import CustomText from "../../../components/CustomText";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { Dispatch } from "react";
import authReducers from "../../../redux/reducers/authReducers";
import {
  DeleteClientEvent,
  DeleteVolunteerEvent,
} from "../../../services/EventClientsApi";
import Toast from "react-native-root-toast";
import ManageNotification from "../ManageNotification/ManageNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions";

const ProfileScreen = ({ navigation, route }) => {
  console.log("RoutesType", route?.params);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const AuthUser = useSelector((state) => state.authReducers.authState);

  useEffect(() => {
    console.log("dfkvkdndkbvk", AuthUser);
  }, [useSelector]);

  const profileData = [
    {
      id: 1,
      name: "Personal",
      family: "semiBold",
      img: icons.person,
      onPress: () =>
        navigation.navigate("PersonalScreen", { AuthUser: AuthUser }),
    },
    {
      id: 2,
      name: "Edit Profile",
      family: "semiBold",
      img: icons.editProfile,
      onPress: () => navigation.navigate("EditProfile", { AuthUser: AuthUser }),
    },
    {
      id: 3,
      name: "Manage Notifications",
      family: "semiBold",
      img: icons.manage,
      onPress: () => setModalVisible(true),
    },
    {
      id: 4,
      name: "How to Use Cutz",
      family: "semiBold",
      img: icons.howuse,
      onPress: () =>
        navigation.navigate("AppDescription", { AuthUser: AuthUser }),
    },
  ];

  const onDeleteAccount = async () => {
    if (AuthUser?.currentUser == "Volunteer") {
      const res = await DeleteVolunteerEvent(AuthUser?.token);
      if (res?.data) {
        Toast.show("Account deleted successfully");
        await AsyncStorage.removeItem?.("CurrentAuth");
        dispatch(logout({}));
        navigation.replace("AuthStack", { screen: "login" });
      }
    } else {
      const res = await DeleteClientEvent(AuthUser?._id, AuthUser?.token);
      console.log("response,", res);
      if (res?.data) {
        Toast.show("Account deleted successfully");
        await AsyncStorage.removeItem?.("CurrentAuth");
        dispatch(logout({}));
        navigation.replace("login");
      }
    }
  };

  return (
    <>
      <SafeAreaView style={commonStyles.commonMain}>
        <PH20>
          <ProfileHeader AuthUser={AuthUser} />
        </PH20>

        <SepratorLine />
        {profileData.map((item) => {
          return (
            <>
              <ProfileBody
                key={item.id}
                name={item.name}
                img={item.img}
                onPress={item.onPress}
                family={item?.family}
              />
              <SepratorLine backgroundColor={"#C9C9C9"} />
            </>
          );
        })}
        <View style={{ height: "10%" }} />
        <SepratorLine backgroundColor={"#C9C9C9"} />

        <ProfileBody
          name={"Delete Account"}
          img={icons.howuse}
          family={"semiBold"}
          onPress={() => {
            Alert.alert(
              "Caution — Deleting your account ",
              `will prevent retrieving your account including active reservations`,
              [
                {
                  text: "confirm",
                  onPress: () => {
                    onDeleteAccount();
                  },
                },
                {
                  text: "cancel",
                  onPress: () => console.log("Cancel Pressed"),
                },
              ]
            );
          }}
          color={colors.primary}
        />
        <SepratorLine backgroundColor={"#C9C9C9"} />
        {/* <Spacer height={10} /> */}
        <ProfileBody
          name={"Logout"}
          img={icons.howuse}
          family={"semiBold"}
          onPress={async () => {
            await AsyncStorage.removeItem?.("CurrentAuth");
            dispatch(logout({}));
            navigation.navigate("login");
          }}
          color={colors.primary}
        />
        <SepratorLine backgroundColor={"#C9C9C9"} />
      </SafeAreaView>
      <ManageNotification
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
