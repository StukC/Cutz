import { StyleSheet, Text, View,TouchableOpacity,Image, Platform } from 'react-native'
import React,{useState} from 'react'
import CustomText from '../../../../components/CustomText'
import { colors } from '../../../../utils/Colors'
import { scale, verticalScale } from 'react-native-size-matters'
import { Feather } from "@expo/vector-icons";
import { icons } from '../../../../../assets/icons'


const NotificationContainer = (props) => {
    const [check, setCheck] = useState(false);

  return (
    <TouchableOpacity
    activeOpacity={0.6}
    onPress={props.onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(15)
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center",}}>
          {
              props?.enable?(
                <TouchableOpacity
                style={{...styles.checkCon,backgroundColor:check?colors.primary:null,
                  borderWidth:check?null: 1.5,
                  borderColor:check?null: "#949393",
              }}
                activeOpacity={0.6}
                onPress={() => setCheck(!check)}
              >
                {check && <Feather name="check" size={20} color={colors.white} />}
              </TouchableOpacity>

              ):<></>
              
          }
    
        <CustomText
          label={props.name}
          fontSize={13}
        //   fontWeight="bold"
          fontFamily={props.family ||"medium"}
          marginLeft={ props?.enable?10:0}
          color={props.color|| colors.secondary}
        />
      </View>
     
    </TouchableOpacity>
  
  )
}

export default NotificationContainer

const styles = StyleSheet.create({

    checkCon: {
        width: 23,
        height: 23,
      alignItems:"center",
      justifyContent:"center",
        borderRadius: 5,
        
      },



})