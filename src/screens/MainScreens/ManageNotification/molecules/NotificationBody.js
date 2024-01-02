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

const NotificationBody = ({ setModalVisible }) => {
  const profileData = [
    {
      id: 1,
      name: "Push Notification",
      img: icons.person,
      //   onPress: () => navigation.navigate("PersonalScreen"),
    },
    
  ];
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
    </>
  );
};

export default NotificationBody;

const styles = StyleSheet.create({});
