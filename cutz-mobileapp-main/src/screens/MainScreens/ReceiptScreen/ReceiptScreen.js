import {
    StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useRef, useState} from "react";
import CustomText from "../../../components/CustomText";
import {Spacer} from "../../../components/Spacer";
import {colors} from "../../../utils/Colors";
import {scale, verticalScale} from "react-native-size-matters";
import {icons} from "../../../../assets/icons";
import {Avatar, Image} from "react-native-elements";
import {images} from "../../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import commonStyles from "../../../utils/CommonStyles";
import TicketCheckInAndOut from "./Molecules/TicketCheckInAndOut";
import InputItem from "./Molecules/InputItem";
import ThumbGreeting from "./Molecules/ThumbGreeting";
import SmileGreeting from "./Molecules/SmileGreeting";
import AppHeader from "../../../components/AppHeader";
import TicketDetails from "../WelcomeScreen/Molecules/TicketDetails";
import {useIsFocused} from "@react-navigation/native";
import TicketCheckInAndOutVol from "./Molecules/TicketCheckInAndOutVol";
import TicketCarousel from "./Molecules/TicketCarousel";
import {useSelector} from "react-redux";
import {
    getReservationClient,
    getReservationClientWithAllDetails,
    getReservationVolunteer,
    getReservationVolunteerWithAllDetails,
} from "../../../services/Reservation";
import {getEvents} from "../../../services/Events";
import {getEventGroup, getEventGroupById} from "../../../services/EventGroup";
import Loader from "../../../utils/Loader";
import loaderAnimation from "../../../../assets/Loaders";
import {getTimingBy, getTimingByEventId, getTimings} from "../../../services/Timing";
import {getOrganizationById} from "../../../services/Organization";
import moment from "moment";
import { URLS } from "../../../services/Urls";

const currentDate = new Date().toString();

const ReceiptScreen = ({navigation: {navigate}, route}) => {
    // console.log("RoutesType", route?.params);
    const AuthUser = useSelector((state) => state.authReducers.authState);
    const isFocused = useIsFocused();

    const [check, setCheck] = useState(false);
    const [state, setState] = useState({
        loading: false,
        checkIn: false,
        checkOut: false,
        greet: false,
        ticketDetail: false,
        events: [],
        reservations: [],
        tickets: [],
        currentTicket: {},
        ticketData: {},
    });

    const loaderOn = () => {
        setState({...state, loading: true});
    };
    const loaderOff = () => {
        setState({...state, loading: false});
    };

    useEffect(() => {
        if (isFocused) {
            loaderOn();
            if (AuthUser.clientStatus) {
                getReservationClientWithAllDetails(AuthUser.token).then((allEvents) => {
                    setState({...state, tickets: allEvents.data,ticketData:allEvents.data[0]});
                })
            } else {
                getReservationVolunteerWithAllDetails(AuthUser.token).then((allEvents) => {
                    setState({...state, tickets: allEvents.data,ticketData:allEvents.data[0]});
                })
            }
        }
    }, [isFocused]);

    const handleProceedPress = (ticket) => {
        if (ticket) navigate("Event", {
            location: ticket.addresses[0].location,
        });
    };
    const handleTicketPress = () => {
        setState({
            ...state, ticketData: state.currentTicket, ticketDetail: true,
        });

    };
    
    const handleViewDetailsPress = async (index) => {
        const ticketData = state.tickets[index];
        navigate("ViewDetails", { ticket: ticketData });
    };

    const handleCancelPress = async (index) => {
        try {
            const reservationId = state.tickets[index].reservationId;
            const userType = AuthUser.clientStatus ? 'Client' : 'Volunteer'; // Determine user type
            const userURL = userType === 'Client' ? `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_CLIENT}` : `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_VOLUNTEER}`;
            // Construct URL based on user type
            const response = await fetch(`${userURL}/DeleteEventReservation/${reservationId}`, { // Use userURL
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Add any necessary authentication headers
                },
            });
            if (!response.ok) {
                throw new Error("Failed to cancel reservation");
            }
    
            const updatedTickets = state.tickets.filter((ticket, i) => i !== index);
            setState({...state, tickets: updatedTickets});
        } catch (error) {
            console.error("Error canceling reservation:", error);
            // Handle error
        }
    };


    return (<>
        <SafeAreaView style={styles.container}>
            {/* <ScrollView> */}

            {!state.ticketDetail ? (<>
                {/* <Spacer height={notch?30:10} /> */}

                <AppHeader ticket onPressTicket={handleTicketPress}/>

                <TicketCarousel
                    tickets={state.tickets}
                    state={state}
                    setState={setState}
                    handleCancelPress={handleCancelPress}
                    handleViewDetailsPress={handleViewDetailsPress}
                    handleProceedPress={handleProceedPress}
                />
            </>) : AuthUser.clientStatus ? (<>
                <AppHeader
                    backButton={state.checkOut ? false : true}
                    onPressBack={() => {
                        setState({...state, ticketDetail: false});
                    }}
                />
                {/* <Text>{AuthUser._id}</Text> */}
                <TicketCheckInAndOut
                    state={state.ticketData}
                    setState={setState}
                    profilePicture={AuthUser?.profilePicture}
                />
            </>) : (<>
                <AppHeader
                    backButton={state.checkOut ? false : true}
                    onPressBack={() => {
                        setState({...state, ticketDetail: false});
                    }}
                />
                {state.greet ? (state.checkOut ? (<SmileGreeting
                    state={state}
                    setState={setState}
                    navigate={navigate}
                />) : (<ThumbGreeting
                    onPress={() => {
                        setState({
                            ...state, greet: false, checkIn: true,
                        });
                    }}
                />)) : (<TicketCheckInAndOutVol state={state} setState={setState}/>)}
            </>)}

            {/* </ScrollView> */}
        </SafeAreaView>
        <Loader file={loaderAnimation} loading={state.loading}/>
    </>);
};

export default ReceiptScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.white,
    }, shadowDivider: {
        width: "100%", height: 2, backgroundColor: colors.white, shadowColor: "#000", shadowOffset: {
            width: 0, height: 5,
        }, shadowOpacity: 0.5, shadowRadius: 5,

        elevation: 9,
    }, cardStyle: {
        width: "80%",
        height: "45%",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        elevation: 9,
    }, voucherContainer: {
        // alignItems: "center",
    }, voucherHeader: {
        // width:300,
        height: verticalScale(40), // width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 9,
    }, voucherBody: {
        // height: verticalScale(100),
        width: 300, backgroundColor: colors.white, borderRadius: 10, shadowColor: "#000", shadowOffset: {
            width: 0, height: 5,
        }, shadowOpacity: 0.3, shadowRadius: 5,

        elevation: 9,
    },
});
