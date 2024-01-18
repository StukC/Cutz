import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../../assets/icons";
import { scale } from "react-native-size-matters";
import SepratorLine from "./SepratorLine";
import { colors } from "../utils/Colors";
import { Platform } from "react-native";
import { Spacer } from "./Spacer";
import { TouchableOpacity } from "react-native-gesture-handler";

const AppHeader = ({ ticket, backButton, onPressTicket, onPressBack }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: scale(20),
        }}
      >
        <Image
          source={icons.appIconNav}
          resizeMode={"contain"}
          style={{ height: 60, width: 100 }}
        />

        <View style={{ flexDirection: "row" }}>
          {ticket ? (
            <>
              <TouchableOpacity onPress={onPressTicket}>
                <Image
                  source={icons.ticket2}
                  resizeMode={"contain"}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
              <Spacer width={10} />
            </>
          ) : (
            <></>
          )}
          {backButton ? (
            <>
              <TouchableOpacity onPress={onPressBack}>
                <Image
                  source={icons.back}
                  resizeMode={"contain"}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
              <Spacer width={10} />
            </>
          ) : (
            <></>
          )}
          <Image
            source={icons.bell}
            resizeMode={"contain"}
            style={{
              height: 40,
              width: 40,
            }}
          />
        </View>
      </View>

      <SepratorLine
        height={1}
        backgroundColor={colors.gray1}
        style={{
          shadowColor: Platform.OS == "ios" ? colors.gray : colors.black,
          shadowRadius: 2,
          elevation: 2,
          shadowOpacity: 0.4,
          // inputMarginTop:-20,
          shadowOffset: { width: -1, height: 1 },
        }}
      />
    </>
  );
};

export default AppHeader;
