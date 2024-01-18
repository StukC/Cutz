import React, {useEffect, useState} from "react";
import {
    Image,
    SafeAreaView, ScrollView, StyleSheet, View
} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useSelector} from "react-redux";

import {getDescription} from "../../../services/Description";
import Loader from "../../../utils/Loader";

import CustomText from "../../../components/CustomText";
import {icons} from "../../../../assets/icons";
import loaderAnimation from "../../../../assets/Loaders/index";
import {PH20} from "../../../utils/CommonStyles";
import {Spacer} from "../../../components/Spacer";

const AppDescription = ({navigation}) => {

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
            <Spacer height={50}/>
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
                <ScrollView>
                    <CustomText
                        label={description}
                        fontFamily="regular"
                        fontSize={14}
                        color={"#969696"}
                    />
                </ScrollView>
            </PH20>
            <Loader file={loaderAnimation} loading={loading}/>
        </SafeAreaView>);
};

export default AppDescription;

const styles = StyleSheet.create({
    headerRow: {display: 'flex', flexDirection: 'row', columnGap: 10}
});
