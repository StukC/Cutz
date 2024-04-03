import React, { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { getDescription } from "../../../services/Description";
import Loader from "../../../utils/Loader";

import CustomText from "../../../components/CustomText";
import { icons } from "../../../../assets/icons";
import loaderAnimation from "../../../../assets/Loaders/index";
import { PH20 } from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";

const AppDescription = ({ navigation }) => {

    const AuthUser = useSelector((state) => state.authReducers.authState);

    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        setLoading(true);
        getDescription(AuthUser.token).then((data) => {
            setLoading(false);
            setDescription(data.data.length > 0 ? data.data[0].description : "App Description will update soon")
        })
    }, []);

    return (
        <SafeAreaView>
            <Spacer height={30}/>
            <PH20>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image
                            source={icons.back}
                            resizeMode={"contain"}
                            style={{
                                height: 40,
                                width: 40,
                            }}
                        />
                    </TouchableOpacity>
                    <CustomText
                        label="App Description"
                        fontFamily="semiBold"
                        fontSize={18}
                        color={"#969696"}
                    />
                </View>
                <Spacer height={20}/>
                <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
                <CustomText
    label={"The app that gets you in line, in time.  "}
    fontFamily="bold"
    fontSize={16}
    color={"#000000"}
    style={{ textAlign: "center" }}
/>
                    <CustomText
                        label={"Cutz connect users with non-profits, for-profits, and government organizations and helps manage large events by eliminating chaos and congestion."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"Looking For Help?"}
                        fontFamily="semiBold"
                        fontSize={16}
                        color={"#000000"}
                    />
                    <CustomText
                        label={"SELECT CLIENT TAB — Complete Registration."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"1. Select an organization, an event, location, date, and time you would like to reserve. (Note: Time slots will disappear when they are filled.)"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"2. Get in line when you are alerted in the app."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"3. Have the Cutz app open and screen ready to allow a volunteer to type a 4 digit event code upon entry."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"4. Ready to exit? Hold your screen towards the volunteer and allow them to enter a 4 digit check-out code."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"IMPORTANT: If you do not have reservations for an event you would like to attend, you may enter the area 15 minutes prior to end of the event. There are no guarantees without reservations."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#FF0000"}
                    />
                    <CustomText
                        label={"NOTIFICATIONS: If an event is cancelled or if there are changes to an event, you will find the details in the notifications section."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"When you make reservations and are late or a no-show, you will not be allowed in until 15 minutes prior to the end of the event. Please get in line with those waiting to enter without a reservation. If you miss your reservations 3 times, you may be eliminated from making future reservations by the Admin of the organization(s)."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#FF0000"}
                    />
                    <CustomText
                        label={"Want to Volunteer?"}
                        fontFamily="semiBold"
                        fontSize={16}
                        color={"#000000"}
                    />
                    <CustomText
                        label={"SELECT VOLUNTEER TAB — COMPLETE REGISTRATION."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"1. Select an organization, an event, location, date, and time you would like to volunteer. (Note: Time slots will disappear when they are filled.)"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"2. Check-in with an Admin as soon as you arrive and allow them to enter your volunteer event code (upon arrival and when your shift is complete)."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"IMPORTANT: If you are late or a no-show for volunteering, it slows the entire event down. Remember, the Organization is relying on its Volunteers to keep things flowing and on schedule. Please be on-time and stay through your shift. All late Volunteers, must see an Admin before you begin work. Volunteers are asked to help with clean-up at the end of the event."}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#FF0000"}
                    />
                    <CustomText
                        label={"Developed in cooperation with UM-D. Special “thank you” to:"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"Dr. Bruce Maxim, PhD Natty Natarajan Professor of Engineering Computer and Information Science"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"and"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"Dr. Mahmoud Abou-Nasr, PhD???"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"Michele Maltese — Concept / Design / UI/UX"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"Jennifer Kujawski — Concept Support / Admin Experiences"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                    <CustomText
                        label={"Team 2 — Shahd Mustafa — Project Manager / Developer Meher Jabber — Developer Chase Stuck — Developer Sierra Corl — Developer"}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                </ScrollView>
            </PH20>
            <Loader file={loaderAnimation} loading={loading}/>
        </SafeAreaView>);
};
<Spacer height={100} /> 
export default AppDescription;

const styles = StyleSheet.create({
    headerRow: { display: 'flex', flexDirection: 'row', columnGap: 10 }
});
