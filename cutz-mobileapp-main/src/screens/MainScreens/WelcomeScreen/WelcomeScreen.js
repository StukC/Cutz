import {Platform, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {colors} from "../../../utils/Colors";
import {SafeAreaView} from "react-native-safe-area-context";
import AppHeader from "../../../components/AppHeader";
import EventDetail from "./Molecules/EventDetail";
import TicketDetails from "./Molecules/TicketDetails";
import {useIsFocused} from "@react-navigation/native";
import Swiper from "react-native-swiper";
import {useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getEventById, getEvents, getHomeScreenData} from "../../../services/Events";
import Loader from "../../../utils/Loader";
import loaderAnimation from "../../../../assets/Loaders";
import {
    postEventReservationClient,
    postEventReservationVolunteer,
} from "../../../services/Reservation";
import moment from "moment";
import {
    getOrganizationById,
    getOrganizations,
} from "../../../services/Organization";
import {getTimings} from "../../../services/Timing";
import {getEventGroupTimes} from "../../../services/EventGroup";
import {getDistinctObjectsByKey, getDistinctObjectsByKeyForDates} from "../../../utils/Common";

const WelcomeScreen = ({navigation: {navigate}, route}) => {

    const AuthUser = useSelector((state) => state.authReducers.authState);

    const [events, setEvents] = useState([]);
    const [state, setState] = useState({
        events: [],
        companyData: [],
        eventTypes: [],
        timings: [],
        timingsOriginal: [],
        eventGroup: [],
        ticketData: {},
        loading: false,
        searchOrg: -1,
        searchType: -1,
        error: 0,
    });
    const [ticketVisible, setTicketVisible] = useState(false);
    const isFocused = useIsFocused();

    const handleConfirmPress = () => {
        loaderOn();
        const data = {
            eventGroupID: state.ticketData.groupId,
            eventID: state.ticketData.eventId,
            checkIN: "",
            checkOut: "",
        };
        //clientStatus
        if (AuthUser._id)
            if (AuthUser.clientStatus) {
                postEventReservationClient(data, AuthUser.token).then((r) => {
                    loaderOff();
                    if (r?.data) navigate("Receipt");
                    else alert("Event already reserved for Client");
                });
            } else {
                postEventReservationVolunteer(data, AuthUser.token).then((r) => {
                    loaderOff();
                    if (r?.data) navigate("Receipt");
                    else alert("Event already reserved for Volunteer");
                });
            }
    };
    const handleBookingPress = (time) => {
        if (AuthUser.clientStatus) {
            setTicketVisible(true);
            setState({
                ...state,
                ticketData: time,
            });
        }else {
            if (state.eventTypes.length) {
                if (state.timings.length) {
                    loaderOn();


                    console.log('time', time)

                    let mainEventTime = state.timings.filter((e) => e.eventId === time.eventID);
                    if (time.eventID) {
                        if (AuthUser.clientStatus) {
                            getEventById(time.eventID).then((r) => {
                                let event = r.data;
                                getOrganizationById(event.orgId).then((r) => {
                                    let org = r.data;
                                    setState({
                                        ...state,
                                        ticketData: {
                                            ...event,
                                            ...time,
                                            ...mainEventTime,
                                            eventId: event._id,
                                            groupId: time._id,
                                            organization: org.organizationName,
                                        },
                                    });
                                    setTicketVisible(true);
                                    console.log("state.ticketData", {
                                        ...time,
                                        ...event,
                                        organization: org.organizationName,
                                    });
                                });
                                // loaderOff();
                            });
                        } else {
                            if (state.error) {
                                getEventById(time.eventID).then((r) => {
                                    let event = r.data;
                                    getOrganizationById(event.orgId).then((r) => {
                                        let org = r.data;
                                        setState({
                                            ...state,
                                            ticketData: {
                                                ...time,
                                                ...event,
                                                ...mainEventTime,
                                                eventId: event._id,
                                                groupId: time._id,
                                                organization: org.organizationName,
                                            },
                                        });
                                        setTicketVisible(true);
                                        console.log("state.ticketData", {
                                            ...time,
                                            ...event,
                                            organization: org.organizationName,
                                        });
                                    });
                                    // loaderOff();
                                });
                            } else {
                                loaderOff();
                                alert("Select Timing");
                            }
                        }
                    } else {
                        loaderOff();
                        alert("Error");
                    }
                } else {
                    alert("Select Timing");
                }
            } else {
                alert("Select Event Type");
            }
        }
    };
    const handleCancelPress = () => {
        setTicketVisible(false);
    };
    const loaderOn = () => {
        setState({...state, loading: true});
    };
    const loaderOff = () => {
        setState({...state, loading: false});
    };

    useEffect(() => {
        // let companyData = [];
        // let eventTypes = [];
        if (isFocused) {


            loaderOn();

            getOrganizations().then((r) => {
                let data = r.data;
                let companyData = data.map((o, index) => ({
                    index: index,
                    id: o._id,
                    title: o.organizationName,
                }));
                if (companyData.length > 0) {
                    getHomeScreenData(companyData[0].id).then((events) => {
                        setState({
                            ...state,
                            events: events.data.events,
                            companyData: companyData,

                        });
                    });
                    loaderOff();

                    // getEvents().then((r) => {
                    //     let events = r.data;
                    //     let eventTypes = events.filter((e) => e.orgId._id === companyData[0].id);
                    //     eventTypes = getDistinctObjectsByKey(events.map((o, index) => ({
                    //         index: index,
                    //         id: o._id,
                    //         title: o.eventType,
                    //     })), 'title');
                    //
                    //
                    //     if (eventTypes.length > 0) {
                    //         getEventGroupTimes(eventTypes[0].id).then((r) => {
                    //             let dataEventGroup = r.data;
                    //             getTimings().then((r) => {
                    //                 let data = r.data;
                    //
                    //                 let timeFilter = data.filter((e) => {
                    //                     return e.eventId?.eventType === eventTypes[0].title
                    //                 });
                    //
                    //                 data = getDistinctObjectsByKeyForDates(timeFilter, 'eventStartTime');
                    //
                    //
                    //                 setState({
                    //                     ...state,
                    //                     timings: data,
                    //                     timingsOriginal: timeFilter,
                    //                     events: events,
                    //                     eventTypes: eventTypes,
                    //                     companyData: companyData,
                    //                     eventGroup: dataEventGroup,
                    //                 });
                    //             });
                    //         });
                    //     }
                    // });
                }
            });
        }
    }, [isFocused, ticketVisible]);


    useEffect(() => {
        setTicketVisible(false);
    }, [isFocused]);

    useEffect(() => {
        setTimeout(() => {
            if (isFocused) {
                if (route?.params?.eventData) {
                    state.events.map((item, index) => {
                        if (item.eventType === route?.params?.eventData)
                            setState({...state, searchType: item.eventType});
                        // if (item.title===route?.params?.org)
                        // setState({ ...state, searchIndex: index });
                    });
                } else if (route?.params?.org) {
                    state.companyData.map((item, index) => {
                        // console.log(index,item.organizationName);
                        if (item.title === route?.params?.org)
                            setState({...state, searchOrg: index});
                        // console.log(route?.params?.org);
                    });
                }
            }
        }, 1000);
        // console.log("Data=>",route?.params?.data)
    }, [isFocused]);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <AppHeader/>
                {!ticketVisible ? (
                    <EventDetail
                        // userType={AuthUser?.clientStatus}
                        userType={AuthUser?.currentUser}
                        handleBookingPress={handleBookingPress}
                        state={state}
                        setState={setState}
                    />
                ) : (
                    <TicketDetails
                        // userType={AuthUser?.clientStatus}
                        userType={AuthUser?.currentUser}
                        ticketData={state.ticketData}
                        handleConfirmPress={handleConfirmPress}
                        handleCancelPress={handleCancelPress}
                        state={state}
                        setState={setState}
                        navigate={navigate}
                        cardBtnText={"Confirm"}
                    />
                )}
            </SafeAreaView>
            {/* <Loader file={loaderAnimation} loading={state.loading}/> */}
        </>
    );
};

export default WelcomeScreen;

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
    orgListItem: {
        alignItems: "center",
    },
    shadow: {
        shadowColor: Platform.OS === "ios" ? "#343a40" : colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,

        elevation: 9,
    },
});

