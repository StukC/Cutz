// cleaned up imports

import React from "react";
import { View, Image, TouchableOpacity, Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { PH20 } from "../../../utils/CommonStyles";
import { icons } from "../../../../assets/icons";
import { Spacer } from "../../../components/Spacer";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../utils/Colors";


const SignupHeader = ({ navigation,setCheckUser,checkUser }) => {
  const checkUserData=["Client", "Volunteer"]

  return (
    <View>
      <Spacer height={Platform.OS==='ios' ?0:10} />
      <PH20>
        <TouchableOpacity ctiveOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image resizeMode="contain" source={icons.back} style={{ width:scale(40), height: scale(40)}} />
        </TouchableOpacity>
        
        <Spacer height={10} />

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          {
            checkUserData.map((item, index) => {
              return(
                <CustomButton
                  onPress={() => setCheckUser(item)}
                  width={"46%"}
                  borderTopLeftRadius={10}
                  height={verticalScale(27)}
                  borderTopRightRadius={10}
                  backgroundColor={ item==checkUser ? colors.secondary : colors.primary}
                  title={item}
                />
              )
            })
          }
        </View>
      </PH20>
    </View>
  )
}

export default SignupHeader;