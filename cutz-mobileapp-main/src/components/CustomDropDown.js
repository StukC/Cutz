import {
    Platform, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import {verticalScale} from "react-native-size-matters";
import {colors} from "../utils/Colors";
import CustomText from "./CustomText";
import SepratorLine from "./SepratorLine";

const height = Dimensions.get("screen").height;
import Modal from "react-native-modal"

const CustomDropDown = ({dropData, modalVisible, setModalVisible, setEventData, leftModal, modalWidth}) => {
    const [selectItem, setSelectItem] = useState(0);
    return (<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => {
            setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>

            <View
                style={{
                    width: modalWidth || "62%",
                    maxHeight: 250, // height: verticalScale(130),
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    shadowColor: Platform.OS === "ios" ? "#343a40" : colors.black,
                    shadowRadius: 2,
                    elevation: 5,
                    position: "absolute",
                    shadowOpacity: 0.5,
                   // inputMarginTop:-20,
                    shadowOffset: {width: 1, height: 3},
                    top: -220,
                    left: leftModal || "35%",
                }}
            >
                <ScrollView contentContainerStyle={{flexGrow: 0, zIndex: 100, }}>
                    {dropData.map((item, index) => {
                        return (<>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    setEventData(item?.name)
                                    setModalVisible(false);
                                    setSelectItem(index)

                                }}
                                style={{
                                    backgroundColor: index == selectItem ? colors.primary : null,
                                    borderTopLeftRadius: index == 0 ? 10 : 0,
                                    borderTopRightRadius: index == 0 ? 10 : 0,
                                }}
                            >
                                <CustomText

                                    color={colors.secondary}
                                    fontSize={14}
                                    fontFamily="semiBold"
                                    marginTop={5}
                                    marginLeft={10}
                                    marginBottom={5}
                                    //   alignSelf="center"
                                    label={item?.name}
                                />
                            </TouchableOpacity>

                            {dropData.length - 1 == index ? (<></>) : (
                                <SepratorLine backgroundColor={colors.primary}/>)}
                        </>);
                    })}
                </ScrollView>
            </View>
        </View>

    </Modal>);
};

export default CustomDropDown;

const styles = StyleSheet.create({
    centeredView: {
        marginTop: 22,
    },
});
