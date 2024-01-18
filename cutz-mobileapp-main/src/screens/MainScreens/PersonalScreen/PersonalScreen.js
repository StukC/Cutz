import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyles, { PH20, PH10 } from "../../../utils/CommonStyles";
import { icons } from "../../../../assets/icons";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/Colors";
import SepratorLine from "../../../components/SepratorLine";
import { Spacer } from "../../../components/Spacer";
import NameContainer from "./NameContainer";
import DetailContainer from "./DetailContainer";

const PersonalScreen = ({ navigation, route }) => {
  const [authUser, setAuthUser] = useState(null);

  // console.log("RoutesType",route?.params?.type?.params?.userType)

  console.log("RoutesType", authUser);

  useEffect(() => {
    setAuthUser(route?.params?.AuthUser);
  }, [route?.params]);

  return (
    <SafeAreaView style={commonStyles.commonMain}>
      <ScrollView>
        <Spacer height={10} />

        <PH10>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}
            >
              <Image source={icons.cross} style={commonStyles.imgContainer} />
            </TouchableOpacity>

            <CustomText
              color={colors.secondary}
              fontSize={20}
              fontFamily="medium"
              marginLeft={10}
              label="Personal"
            />
          </View>
        </PH10>
        <Spacer height={15} />

        <SepratorLine
          height={1.5}
          style={{
            shadowColor: Platform.OS == "ios" ? "black" : colors.black,
            shadowRadius: 2,
            elevation: 5,
            shadowOpacity: 0.4,
            // inputMarginTop:-20,
            shadowOffset: { width: -1, height: 3 },
          }}
        />
        <Spacer height={1} />

        <NameContainer name={"FULL NAME"} />
        <DetailContainer
          name={authUser?.firstName + " " + authUser?.lastName}
        />
        <NameContainer name={"YOUR INFO"} />
        <DetailContainer name={authUser?.phoneNumber} />
        <DetailContainer name={authUser?.email} />
        <NameContainer name={"ADDRESS"} />
        <DetailContainer name={authUser?.address} />
        {authUser?.currentUser === "Client" ? (
          <>
            <NameContainer name={"FAMILY SIZE"} />
            <DetailContainer name={authUser?.familySize} />
          </>
        ) : (
          <>
            <NameContainer name={"Affiliation"} />
            <DetailContainer name={authUser?.employer} />
          </>
        )}
        {/* <NameContainer name={"Affiliation"} />
      <DetailContainer name={"Employer (if any)"} />
      {authUser?.currentUser === "Client" && (
        <>
          <NameContainer name={"FAMILY SIZE"} />
          <DetailContainer name={"# of mouths"} />
        </>
      )} */}
        {/* if  account type volunteer */}
        {/* <NameContainer name={"FAMILY SIZE"} />
        <DetailContainer name={"# of mouths"}/> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalScreen;

const styles = StyleSheet.create({});
