import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import React from 'react';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
// import colors from '../../Utils/colors';
import { colors } from '../utils/Colors';
function CustomText(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      disabled={!props.onPress}
      style={[
        props.container,
        {
          width: props.width,
        },
      ]}>
      <Text
        style={[
          {
            color: props.color || colors.black,
            fontSize: verticalScale(props.fontSize || 10),
            marginTop: verticalScale(props.marginTop || 0),
            marginBottom: verticalScale(props.marginBottom || 0),
            margin: moderateScale(props.margin || 0),
            marginLeft: scale(props.marginLeft || 0),
            marginRight: scale(props.marginRight || 0),
            alignSelf: props.alignSelf || 'flex-start',
            fontWeight: props.fontWeight,
            marginHorizontal:props.marginHorizontal,
            fontStyle: props.fontStyle,
            fontFamily: props.fontFamily || "regular",
            marginVertical: verticalScale(props.marginVertical || 0),
            textAlign: props.textAlign,
            lineHeight:props.lineHeight,

            // text-decoration-color: "red";
          },
          props.textStyle,
        ]}
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={props.numberOfLines}
        textDecorationStyle={props.textDecorationStyle}



        textDecorationLine={props.textDecorationLine}
        textDecorationColor= {props.textDecorationColor}
        >
        {props.label}
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomText;
