import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import React from "react";
import CustomText from "../../../components/CustomText";
import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import { icons } from "../../../../assets/icons";
import { colors } from "../../../utils/Colors";
import SepratorLine from "../../../components/SepratorLine";
import { Spacer } from "../../../components/Spacer";
import NotificationBody from "./molecules/NotificationBody";
import NotificationContainer from "./molecules/NotificationContainer";
import Modal from "react-native-modal";

const ManageNotification = ({ modalVisible, setModalVisible }) => {
  const profileData = [
    {
      id: 1,
      name: "Push Notification",
      img: icons.person,
      //   onPress: () => navigation.navigate("PersonalScreen"),
    },
    
  ];
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{backgroundColor:colors.white,borderRadius:20,
       shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
       shadowRadius: 2,
       elevation: 5,
       shadowOpacity: 0.5,
       // inputMarginTop:-20,
       shadowOffset: { width: 1, height: 3 },
      }}>
        <View style={{height:"70%",width:"100%",
       
      }}> 
        <NotificationBody setModalVisible={setModalVisible} />


        </View>
        {/* <Spacer height={40} /> */}
      </View>
    </Modal>
  );
};
export default ManageNotification;

const styles = StyleSheet.create({});
