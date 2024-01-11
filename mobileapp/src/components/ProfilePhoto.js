import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../utils/Colors';
import {Spacer} from './Spacer';
import { icons } from '../../assets/icons';
import { FontAwesome5 } from '@expo/vector-icons'; 



const ProfilePhoto = (props) => {
  const height = Dimensions.get('screen').height;
  return (
    <View>
      <View
        style={{
          width:  props.width ||  scale(60),
          height:  props.height || scale(60),
          borderRadius: 100,
          backgroundColor: '#0B0889',
          // opacity:0.5,
          alignItems: 'center',
          flexDirection:"row",
          alignSelf:props.alignSelf,
          justifyContent:"center",
          // marginTop: height/ 7.7
        }}>
          <View style={{alignSelf:"center"}}>
          <FontAwesome5 name="user-alt" size={moderateScale(38)} color={colors.white} />


          </View>
        {/* <Image
          source={icons.person}
          style={{width: '90%', height: '90%', alignSelf: 'center'}}
        /> */}
        {
          props.addPhoto &&(
            <View
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: 30,
              backgroundColor: colors.white,
              position: 'absolute',
              alignSelf: 'flex-end',
              marginTop: verticalScale(32),
              right: -5,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}>
              <Image source={icons.camera} style={{width:25,height:25}}/>
            {/* <SimpleLineIcons
              name="camera"
              color={colors.black}
              size={moderateScale(19)}
            /> */}
          </View>

          )
        }
       
      </View>
    </View>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({});
