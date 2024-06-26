import React, { useEffect, useState } from "react";
import {
    Modal, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { colors } from "../../../../utils/Colors";
import { Image } from "react-native-elements";
import { icons } from "../../../../../assets/icons";
import { Spacer } from "../../../../components/Spacer";
import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import { verticalScale } from "react-native-size-matters";
import { Platform } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import moment from "moment";
import OTP from "./OTP";

const currentDate = new Date().toString();

const TicketCheckInAndOut = ({ setState, state, profilePicture }) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [pins, setPins] = useState({
        pin1: "", pin2: "", pin3: "", pin4: "",
    });
    const isFocused = useIsFocused();
    const modelClose = () => {
        setVisible(false);
    };
    const modelOpen = () => {
        setVisible(true);
    };

    useEffect(() => {
        console.log(moment(state?.time?.eventStartTime).format('X'));
        console.log('currentDate', moment(currentDate).format('X'));

    }, [isFocused]);

    // Check-in modal
    const ModalContent = () => (
        <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255,0.6)", justifyContent: "center" }}>
            <View style={styles.voucherContainer}>
                <View style={styles.voucherBody}>
                    <View style={styles.voucherHeader}>
                        <CustomText
                            label={state?.checkIN ? "Check Out" : "Check In"}
                            color={colors.black}
                            fontFamily={"semiBold"}
                            fontSize={40}
                        />
                        <TouchableOpacity
                            onPress={modelClose}
                            style={{ position: "absolute", right: 20 }}
                        >
                            <Image
                                source={icons.close}
                                containerStyle={{ height: verticalScale(12), width: verticalScale(12) }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Spacer height={20} />
                        <CustomText
                            label={" Enter Code"}
                            color={colors.secondary}
                            fontFamily={"regular"}
                            fontSize={30}
                        />
                        <Spacer height={20} />
                        <OTP state={pins} setState={setPins} />

                        {/* <View style={{ flexDirection: "row", alignItems: "center" }}> */}
                        {/* </View> */}
                    </View>
                    <Spacer height={30} />
                </View>
                <Spacer height={20} />
                <CustomButton
                    title={"Next"}
                    width={"50%"}
                    fontFamily={"bold"}
                    btnStyle={{
                        shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
                        shadowRadius: 2,
                        elevation: 5,
                        shadowOpacity: 0.4, // inputMarginTop:-20,
                        shadowOffset: { width: -1, height: 3 },
                    }}
                    borderRadius={12}
                    onPress={() => {
                        // state.checkIN
                        // ? setState({ ...state, checkOut: true, greet: true })
                        // : setState({ ...state, checkIN: true });
                        let eventCode = state.pin1 + state.pin2 + state.pin3 + state.pin4;
                        if (!state.checkIN) {
                            if (eventCode === state?.eventID?.checkInCode) {
                                setState({
                                    ...state, checkIN: true, pin1: "", pin2: "", pin3: "", pin4: "",
                                });
                                modelClose();
                            } else {
                                alert("Invalid Code");
                            }
                        } else {
                            if (eventCode === state?.eventID?.checkOutCode) {
                                setState({
                                    ...state, checkOut: true, greet: true, pin1: "", pin2: "", pin3: "", pin4: "",
                                });
                                modelClose();
                            } else {
                                alert("Invalid Code");
                            }
                            // } else {
                            //   alert("There is still some time left");
                            // }
                        }
                        // setState({ ...state, pin1: "", pin2: "", pin3: "", pin4: "" });

                        // setTimeout(() => {
                        //   setState({ ...state, pin1: "", pin2: "", pin3: "", pin4: "" })
                        // }, 1000);
                    }}
                />
            </View>
        </View>
    );

    return moment(state?.time?.eventStartTime).format('X') - moment(currentDate).format('X') < 601 ? (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <Spacer height={20} />
            {state.greet ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
                    <CustomText
                        label={"Success!"}
                        color={colors.secondary}
                        fontFamily={"regular"}
                        fontSize={16}
                    />
                    <Spacer height={20} />
                    <CustomText
                        label={`Thank you for attending this event. Gratitude and smiles!`}
                        color={colors.secondary}
                        fontFamily={"semiBold"}
                        fontSize={16}
                        textAlign={"center"}
                    />
                    <Spacer height={20} />
                    <CustomText
                        label={`:)`}
                        color={colors.secondary}
                        fontFamily={"semiBold"}
                        fontSize={50}
                    />
                    <Spacer height={20} />
                    <CustomButton
                        title={"Okay"}
                        width={"50%"}
                        borderRadius={10}
                        onPress={() => {
                            console.log("first");
                            setState({
                                ...state, checkIN: false, checkOut: false, greet: false, ticketDetail: false,
                            });
                            navigation.navigate("Welcome");
                        }}
                    />
                </View>
            ) : (
                <>
                    <Modal
                        transparent
                        animationType="fade"
                        visible={visible}
                        onRequestClose={() => setVisible(false)}
                    >
                        <ModalContent />
                    </Modal>
                    <View style={{ alignItems: "center"} }>
                    
                        <CustomButton
                            title={state.checkIN ? " " : " IT'S TIME TO GET IN LINE"}
                            

                            width={"90%"}
                            height={45}
                            //activeOpacity={3}
                            fontSize={20}
                            fontFamily={"semiBold"}
                            
                            textAlign="center"       

                            
                            />
                        <Spacer height={5} />
                        <CustomText
                            label={"Be Sure To Check Out \n Before You Leave"}
                            color={colors.darkOrange}
                            fontFamily={"semiBold"}
                            fontSize={15}
                            textAlign="center"
                        />
                        <Spacer height={10} />
                    </View>
                    <View style={styles.card}>
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <Spacer height={0} />
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <CustomText
                                    label={"EVENT ID: "}
                                    color={colors.white}
                                    fontFamily={"semiBold"}
                                    fontSize={25}
                                />
                                <CustomText
                                    label={state?.eventID?.event_id}
                                    //label={"125"}

                                    color={colors.white}
                                    fontFamily={"semiBold"}
                                    fontSize={25}
                                />
                            </View>
                            <Spacer height={5} />
                            <CustomText
                               label={moment(state?.time?.eventStartTime).utc().format("MM/DD/YY") + " @ " + state.eventGroupID?.groupHour}
                              //label={"3/20/24 @ 2pm"}

                                color={colors.white}
                                fontFamily={"semiBold"}
                                fontSize={25}
                            />
                            <Spacer height={10} />
                            <View style={{ marginVertical: -60 }}>
                                <View style={{ position: "absolute", top: verticalScale(110), left: verticalScale(-75) }}>
                                    <CustomText
                                        label={"GROUP"}
                                        color={colors.white}
                                        fontFamily={"semiBold"}
                                        fontSize={20}
                                    />
                                </View>
                                <Spacer height={10} />
                                <CustomText
                                    label={state?.eventGroupID?.groupLetter?.toUpperCase() || "A"}
                                   // label = {"Z"}
                                    color={colors.white}
                                    fontFamily={"semiBold"}
                                    fontSize={150}
                                />
                            </View>
                            <CustomText
                               //label={(state.eventGroupID?.groupCapacity || "20") + " People"}
                              label="20 People"
                                color={colors.white}
                                fontFamily={"semiBold"}
                                fontSize={40}
                            />
                        </View>
                        <Spacer height={10} />
                    </View>
                    <Spacer height={30} />
                    <View style={{ alignItems: "center" }}>
                        <CustomButton
                            btnStyle={{
                                shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
                                shadowRadius: 2,
                                elevation: 5,
                                shadowOpacity: 0.4, // inputMarginTop:-20,
                                shadowOffset: { width: -1, height: 3 },
                            }}
                            title={state?.checkIN ? "Check Out" : "Check In"}
                            width={"50%"}
                            borderRadius={10}
                            fontFamily={"semiBold"}
                            onPress={() => {
                                navigation.navigate("TicketOtp", {
                                    state: state, navigation: navigation,
                                });
                            }}
                        />
                    </View>
                   
                </>
            )}
        </View>
    ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 22 }}>Time Not Reached</Text>
        </View>
    );
};

export default TicketCheckInAndOut;

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.drakBlue,
        height: "65%",
        width: "90%",
        borderRadius: 12,
        paddingHorizontal: 10,
        alignSelf: "center",
        shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
        shadowRadius: 2,
        elevation: 5,
        shadowOpacity: 0.4, // inputMarginTop:-20,
        shadowOffset: { width: -1, height: 3 },
    },
    whiteCircle: {
        backgroundColor: colors.white,
        height: 60,
        width: 65,
        borderRadius: 50,
        position: "relative",
        top: -20,
        alignSelf: "center",
        zIndex: -100,
    },
    voucherContainer: {
        alignItems: "center",
    },
    voucherHeader: {
        height: verticalScale(40),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 9,
    },
    voucherBody: {
        width: "75%",
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
        shadowRadius: 2,
        elevation: 5,
        shadowOpacity: 0.4, // inputMarginTop:-20,
        shadowOffset: { width: -1, height: 3 },
    },
});
