import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../utils/Colors";
import MapView, { Marker } from "react-native-maps";
import { icons } from "../../../../assets/icons";
import { Spacer } from "../../../components/Spacer";
import { scale } from "react-native-size-matters";
import { Image } from "react-native-elements";
import CustomText from "../../../components/CustomText";

const EventLocations = ({ navigation, route }) => {
  const Header = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(20),
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Receipt");
        }}
      >
        <Image
          source={icons.back}
          resizeMode={"contain"}
          containerStyle={{
            height: 40,
            width: 40,
          }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Receipt", {
              ticketDetail: true,
              // userType: route?.params?.userType,
            });
          }}
        >
          <Image
            source={icons.ticket2}
            resizeMode={"contain"}
            containerStyle={{
              height: 40,
              width: 40,
            }}
          />
        </TouchableOpacity>
        <Spacer width={10} />
        <Image
          source={icons.bell}
          resizeMode={"contain"}
          containerStyle={{
            height: 40,
            width: 40,
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Spacer height={40} />
      <Header />
      <View style={styles.shadowDivider} />
      <MapView
        region={
          route?.params?.location || {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        style={styles.map}
      >
        
        <Marker
      key={'index'}
      coordinate={route?.params?.location || {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      title={'marker.title'}
      description={'marker.description'}
    />
       
      </MapView>
      {/* <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <CustomText
        label={"This Text Will Replace Map"}
        color={colors.black}
        fontSize={14}
        fontFamily={"semiBold"}
      />
      </View> */}
    </View>
  );
};

export default EventLocations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  shadowDivider: {
    width: "100%",
    height: 2,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 9,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
