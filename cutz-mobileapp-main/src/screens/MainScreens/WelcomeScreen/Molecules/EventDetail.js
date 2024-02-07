import {
    Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {Spacer} from "../../../../components/Spacer";
import CustomText from "../../../../components/CustomText";
import {colors} from "../../../../utils/Colors";
import Carousel from "react-native-reanimated-carousel";
import {PH20} from "../../../../utils/CommonStyles";
import {verticalScale, scale} from "react-native-size-matters";
import CustomButton from "../../../../components/CustomButton";
import MyCarousel from "../../../../../MyCarousel";
import EventTimingCarousel from "../../../../../EventTimingCarousel";
import Loader from "../../../../utils/Loader";
import loaderAnimation from "../../../../../assets/Loaders";
import moment from "moment";
import CompaniesCarousel from "../../../../../CompaniesCarousel";
import {getEvents} from "../../../../services/Events";
import {getTimings} from "../../../../services/Timing";
import EventTimingListItemVolunteer from "./EventTimingListItemVolunteer";
import {useSelector} from "react-redux";
import {getEventGroupTimes} from "../../../../services/EventGroup";
import {findAllOccurrences, getDistinctObjectsByKey} from "../../../../utils/Common";


const EventDetail = ({handleBookingPress, userType, state, setState}) => {
    const AuthUser = useSelector((state) => state.authReducers.authState);

    const [dateIndex, setDateIndex] = useState(0);
    const [selectedOrganizationId, setSelectedOrganizationId] = useState(0);
    const [selectedEventTypeId, setSelectedEventTypeId] = useState(0);
    const [selectedEventTypeIndex, setSelectedEventTypeIndex] = useState(0);
    const [timingIndex, setTimingIndex] = useState(0);
    const [dataLoader, setDataLoader] = useState(false);

    const dateIndexRef = useRef(null);
    const eventIndexRef = useRef(null);

    const AddressContainer = ({place, house, zip, backgroundColor}) => (<TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {

        }}
        style={{
            height: 100,
            paddingVertical: verticalScale(10),
            backgroundColor: backgroundColor,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,

            ...styles.shadow,
        }}
    >
        <CustomText label={place} fontSize={12} textAlign={"center"}/>
        <CustomText label={house} fontSize={12} textAlign={"center"}/>
        <CustomText label={zip} fontSize={12} textAlign={"center"}/>
    </TouchableOpacity>);

    const EventDateItem = ({date, day, MMYY, indexx, eventId}) => (<TouchableOpacity
        style={{
            alignItems: "center",
            backgroundColor: dateIndex === indexx ? colors.white : colors.gray2,
            borderWidth: dateIndex === indexx ? 1 : 0,
            borderColor: colors.secondary,
            paddingHorizontal: scale(18),
            paddingVertical: verticalScale(6),
            marginVertical: verticalScale(10), ...styles.shadow,
        }}
        onPress={() => {
            setSelectedEventTypeId(eventId);
            setDateIndex(indexx)
        }}
    >
        <CustomText
            label={day}
            color={colors.black}
            fontFamily={"regular"}
            marginBottom={-10}
        />
        <CustomText
            label={date}
            color={dateIndex === indexx ? colors.secondary : "#9B9B9B"}
            fontSize={36}
            fontFamily={"bold"}
            marginBottom={-10}
        />
        <CustomText
            label={MMYY}
            color={colors.blue1}
            fontFamily={"semiBold"}
        />
        <Spacer height={4}/>
    </TouchableOpacity>);


    return (<ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <Spacer height={20}/>
        <View style={{alignItems: "center"}}>
            {userType == 'Client' ? (<CustomText
                label={"WELCOME"}
                color={colors.primary}
                fontSize={18}
                fontFamily={"semiBold"}
            />) : (<>
                <CustomText
                    label={"WELCOME VOLUNTEER"}
                    color={colors.primary}
                    fontSize={18}
                    fontFamily={"semiBold"}
                />
                <CustomText
                    label={"CHOOSE AN ORGANIZATION & DATE"}
                    color={colors.primary}
                    fontSize={14}
                    fontFamily={"semiBold"}
                />
            </>)}
        </View>

        <Spacer height={30}/>
        <CompaniesCarousel
            data={state.companyData}
            setSelectedOrganizationId={setSelectedOrganizationId}
            selectedOrganizationIndex={selectedOrganizationId}
            state={state}
            setState={setState}
            setSelectedEventTypeId={setSelectedEventTypeId}
            setSelectedEventTypeIndex={setSelectedEventTypeIndex}
            setDataLoader={setDataLoader}
            setDateIndex={setDateIndex}
        />

        <Spacer height={15}/>
        <View style={{alignItems: "center"}}>
            <CustomText
                label={"TYPE OF EVENT"}
                color={colors.blue1}
                fontSize={11}
                fontFamily={"semiBold"}
            />
        </View>
        <Spacer height={10}/>

        <MyCarousel
            data={state.events}
            dataLoader={dataLoader}
            selectedOrganizationId={selectedOrganizationId}
            selectedEventTypeId={selectedEventTypeId}
            setSelectedEventTypeId={setSelectedEventTypeId}
            selectedEventTypeIndex={selectedEventTypeIndex}
            setSelectedEventTypeIndex={setSelectedEventTypeIndex}
            state={state}
            setState={setState}
            setDateIndex={setDateIndex}
        />

        <Spacer height={20}/>
        <PH20>
            {state.events[selectedEventTypeIndex]?.times?.length ? (<ScrollView
                ref={dateIndexRef}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {state.events[selectedEventTypeIndex].times.map(({
                                                                     eventStartTime,
                                                                     eventId: {_id, eventType},
                                                                 }, index) => {
                    return (<>
                        <EventDateItem
                            date={moment(eventStartTime).utc().format("DD")}
                            day={moment(eventStartTime).utc().format("dddd")}
                            MMYY={moment(eventStartTime).utc().format("MMM") + " " + moment(eventStartTime).utc().format("yy")}
                            indexx={index}
                            eventId={_id}
                        />
                        <Spacer width={20}/>
                    </>)
                })}
            </ScrollView>) : (<View style={{alignSelf: "center"}}>
                {dataLoader ? (<ActivityIndicator color={colors.primary} size={"large"}/>) : (
                    <Text style={{fontSize: 22, color: "#000"}}></Text>)}
            </View>)}
        </PH20>
        <Spacer height={20}/>
        <ScrollView
            ref={eventIndexRef}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
        >
            <PH20>
                <AddressContainer
                    place={state.events[selectedEventTypeIndex]?.times[dateIndex]?.eventId.addresses[0].place}
                    house={state.events[selectedEventTypeIndex]?.times[dateIndex]?.eventId.addresses[0].house}
                    zip={state.events[selectedEventTypeIndex]?.times[dateIndex]?.eventId.addresses[0].zip}
                    backgroundColor={"#EDB879"}
                />
            </PH20>
            {/*<PH20>*/}
            {/*    {state.events[selectedEventTypeIndex].times.map(({eventId: {addresses}, eventStartTime}, index) => {*/}
            {/*            return dataLoader && dateIndex ? (*/}
            {/*            <ActivityIndicator color={colors.primary}*/}
            {/*                               size={"large"}/>) : moment(state.timings[dateIndex]?.eventStartTime).format('DD-MMM-yy') === moment(eventStartTime).format('DD-MMM-yy') &&*/}
            {/*            (<AddressContainer*/}
            {/*                place={addresses[0].place}*/}
            {/*                house={addresses[0].house}*/}
            {/*                zip={addresses[0].zip}*/}
            {/*                indexx={index}*/}
            {/*                backgroundColor={ "#EDB879"}*/}
            {/*            />)*/}

            {/*    })}*/}
            {/*</PH20>*/}

        </ScrollView>

        <Spacer height={20}/>
        <View style={{}}>
            {userType ? (state.events[selectedEventTypeIndex]?.times[dateIndex]?.timeGroup.length && (
                <EventTimingCarousel
                    data={state.events[selectedEventTypeIndex]?.times[dateIndex]?.timeGroup}
                    state={state}
                    timingIndex={timingIndex}
                    setTimingIndex={setTimingIndex}
                />)) : state.timings.length && state.eventTypes.length ? (<>
                <EventTimingListItemVolunteer
                    setState={setState}
                    state={state}
                    label={" Prep Event: " + moment(state.timings[dateIndex].priorEventStartTime)
                        .utc()
                        .format("hh:mmA") + " - " + moment(state.timings[dateIndex].priorEventEndTime)
                        .utc()
                        .format("hh:mmA")}
                />
                <EventTimingListItemVolunteer
                    setState={setState}
                    state={state}
                    label={" Event: " + moment(state.timings[dateIndex].eventStartTime)
                        .utc()
                        .format("hh:mmA") + " - " + moment(state.timings[dateIndex].eventEndTime)
                        .utc()
                        .format("hh:mmA")}
                />
                <EventTimingListItemVolunteer
                    setState={setState}
                    state={state}
                    label={" Clean Up: " + moment(state.timings[dateIndex].afterEventStartTime)
                        .utc()
                        .format("hh:mmA") + " - " + moment(state.timings[dateIndex].afterEventEndTime)
                        .utc()
                        .format("hh:mmA")}
                />
            </>) : (<View style={{alignSelf: "center"}}>
                {dataLoader ? (<ActivityIndicator color={colors.primary} size={"large"}/>) : (
                    <Text style={{fontSize: 22, color: "#000"}}>Not Found</Text>)}
            </View>)}
        </View>
        <Spacer height={20}/>
        <View style={{alignItems: "center"}}>
            <CustomButton
                title={userType ? "Make My Reservation" : "Yes, I Will Volunteer!"}
                width={"80%"}
                fontFamily={"bold"}
                btnStyle={{
                    shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
                    shadowRadius: 2,
                    elevation: 5,
                    shadowOpacity: 0.4, // inputMarginTop:-20,
                    shadowOffset: {width: -1, height: 3},
                }}
                borderRadius={15}
                onPress={() => {
                    let timeDetails = "";
                    if (AuthUser.clientStatus) {

                        if (!timingIndex) {
                            timeDetails = state.events[selectedEventTypeIndex]?.times[dateIndex]?.timeGroup[0];
                        } else {
                            timeDetails = state.events[selectedEventTypeIndex]?.times[dateIndex]?.timeGroup[timingIndex]
                        }
                        if (timeDetails) {
                            if (timeDetails.groupCapacity === timeDetails.count) {
                                alert("This group is not available");
                            } else {
                                let ticketDetails = {
                                    organization: state.companyData.find((org) => org.id === selectedOrganizationId)?.title,
                                    eventType: state.events[selectedEventTypeIndex].title,
                                    eventStartTime: state.events[selectedEventTypeIndex]?.times[dateIndex]?.eventStartTime,
                                    groupHour: timeDetails?.groupHour,
                                    addresses: state.events[selectedEventTypeIndex]?.times[dateIndex]?.eventId?.addresses,
                                    eventId: timeDetails?.eventID,
                                    groupId: timeDetails?._id,
                                }
                                handleBookingPress(ticketDetails);
                            }

                        }
                    } else {
                        if (!dateIndex) {
                            timeDetails = state.timings[0];
                        } else {
                            timeDetails = state.timings[dateIndex];
                        }
                        handleBookingPress(timeDetails);
                    }


                }}
            />
        </View>
        <Spacer height={10}/>
    </ScrollView>);
};

export default EventDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.white,
    }, shadowDivider: {
        width: "100%", height: 2, backgroundColor: colors.white, shadowColor: "#000", shadowOffset: {
            width: 0, height: 5,
        }, shadowOpacity: 0.5, shadowRadius: 5,

        elevation: 9,
    }, orgListItem: {
        alignItems: "center",
    }, shadow: {
        shadowColor: "#000", shadowOffset: {
            width: 0, height: 5,
        }, shadowOpacity: 0.2, shadowRadius: 5,

        elevation: 7,
    },
});
