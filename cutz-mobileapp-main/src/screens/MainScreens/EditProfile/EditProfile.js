import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";
import ProfilePhoto from "../../../components/ProfilePhoto";
import CustomInputs from "./molecules/CustomInputs";
import ClientEditProfile from "./molecules/ClientEditProfile";
import VolunteerEditProfile from "./molecules/VolunteerEditProfile";
import { scale } from "react-native-size-matters";
import { Avatar } from "react-native-elements";
import { images } from "../../../../assets/images";
import { icons } from "../../../../assets/icons";
import * as ImagePicker from "expo-image-picker";
import Loader from "../../../utils/Loader";
import loaderAnimation from "../../../../assets/Loaders/index";


export const onClickImage = async (setImageUri,setImage) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      includeBase64: true,
      // base64: true,
    });
    if (result) {
      // console.log('result ===>',result?.assets[0]?.uri)
      setImageUri(result);
      setImage(result?.assets[0]?.uri);
      // console.log("ResulteImageData",result.type)
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

  // console.log("RoutesType",route?.params?.type?.params?.userType)
  console.log("UserDetail", authUser);
  useEffect(() => {
    // setImage(route?.params?.AuthUser?.profilePicture)
    setImage(route?.params?.AuthUser?.profilePicture);

    setAuthUser(route?.params?.AuthUser);
  }, [route?.params]);
  console.log("ImageUrl", image);

  return (
    <View style={commonStyles.commonMain}>
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
      {/* <Loader loading={loading}/> */}
      <Loader file={loaderAnimation} loading={loading} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
