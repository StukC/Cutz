import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";
import ProfilePhoto from "../../../components/ProfilePhoto";
import CustomInputs from "./molecules/CustomInputs";
import ClientEditProfile from "./molecules/ClientEditProfile";
import VolunteerEditProfile from "./molecules/VolunteerEditProfile";
import Loader from "../../../utils/Loader";
import loaderAnimation from "../../../../assets/Loaders/index";
import BackIcon from "../../../../assets/icons/back.png";
import * as ImagePicker from "expo-image-picker";

export const onClickImage = async (setImageUri, setImage) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      includeBase64: true,
    });
    if (result) {
      setImageUri(result);
      setImage(result?.assets[0]?.uri);
    } else {
      setImageUri("");
    }
  } catch (error) {
    console.log("Error reading an image", error);
  }
};

const EditProfile = ({ route, navigation }) => {
  const [authUser, setAuthUser] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImage(route?.params?.AuthUser?.profilePicture);
    setAuthUser(route?.params?.AuthUser);
  }, [route?.params]);

  return (
    <View style={commonStyles.commonMain}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <ScrollView>
        <PH20>
          <Spacer height={50} />
          {authUser?.currentUser === "Client" ? (
            <ClientEditProfile
              setLoading={setLoading}
              imageUri={imageUri}
              setImageUri={setImageUri}
              navigation={navigation}
            />
          ) : (
            <VolunteerEditProfile
              navigation={navigation}
              setLoading={setLoading}
              imageUri={imageUri}
              setImageUri={setImageUri}
            />
          )}
          <Spacer height={30} />
        </PH20>
      </ScrollView>
      <Loader file={loaderAnimation} loading={loading} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 48,
    height: 48, 
  },
  scrollView: {
    marginTop: 60,
  },
});
