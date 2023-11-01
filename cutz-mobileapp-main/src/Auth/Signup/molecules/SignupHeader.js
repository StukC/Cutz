import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { PH20 } from "../../../utils/CommonStyles";
import { icons } from "../../../../assets/icons";
import { Spacer } from "../../../components/Spacer";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";

const SignupHeader = ({ navigation,setCheckUser,checkUser }) => {
  const checkUserData=[
    "Client",
    "Volunteer",

  ]
  console.log("CheckUserSignupData",checkUser)
  return (
    <View>
      <Spacer height={Platform.OS==='ios' ?0:10} />
      <PH20>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <Image
            resizeMode="contain"
            source={icons.back}
            style={{ width:scale(40), height: scale(40)}}
          />
        </TouchableOpacity>
        <Spacer height={10} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {
              checkUserData.map((item,index)=>{
                return(
                  <CustomButton
                  onPress={()=>setCheckUser(item)}
                  width={"46%"}
                  borderTopLeftRadius={10}
                  height={verticalScale(27)}
                  borderTopRightRadius={10}
                  backgroundColor={ item==checkUser ?colors.secondary:colors.primary}
                  title={item}
                />

                )

              })
            }
        </View>
      </PH20>
    </View>
  );
};

export default SignupHeader;

const styles = StyleSheet.create({});
