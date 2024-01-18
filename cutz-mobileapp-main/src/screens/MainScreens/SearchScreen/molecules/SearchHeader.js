import {
    Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import React, {useState} from "react";
import CustomText from "../../../../components/CustomText";
import {colors} from "../../../../utils/Colors";
import commonStyles from "../../../../utils/CommonStyles";
import {Feather} from "@expo/vector-icons";
import {Spacer} from "../../../../components/Spacer";
import {moderateScale, scale, verticalScale} from "react-native-size-matters";
import {Ionicons} from "@expo/vector-icons";
import CustomDropDown from "../../../../components/CustomDropDown";
import DropDownPicker from "react-native-dropdown-picker";
import SepratorLine from "../../../../components/SepratorLine";

const SearchHeader = ({
                          eventType, organizationName, setEventData, setOrgData,
                      }) => {

    // console.log("organizationName",organizationName)
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([{label: "EAGLES", value: "EAGLES"}, {
        label: "EHH",
        value: "EHH"
    }, {label: "CLEANERS", value: "CLEANERS"}, {label: "APPLE", value: "APPLE"}, {
        label: "GOOGLE",
        value: "GOOGLE"
    }, {label: "SONY", value: "SONY"}, {label: "HUAWEI", value: "HUAWEI"},]);

    const dropData = ["Shelter", "Food", "Fundraisers ", "Other"];
    return (<View style={commonStyles.justifyContainer}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    setModalVisible(false)
                    setOpen(!open);


                }}
                style={{flexDirection: "row", alignItems: "center"}}>
                <CustomText
                    // onPress={() => setModalVisible(!modalVisible)}
                    label="Organization"
                    fontFamily="semiBold"
                    fontSize={18}
                    color={"#969696"}
                />
                {/* <DropDownPicker

          ArrowDownIconComponent={() => (
            <Feather
              name="chevron-down"
              size={moderateScale(30)}
              color="#969696"
            />
          )}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={"Organization"}
          // iconContainerStyle={{height:200}}

          labelStyle={{ fontFamily: "semiBold", fontSize: 18 }}
          listItemLabelStyle={{ fontFamily: "semiBold", fontSize: 18 }}
          placeholderStyle={{
            color: "#969696",
            fontFamily: "semiBold",
            fontSize: 20,
          }}
          // containerProps={{
          //   height: open === true ? 120 : null,
          // }}
          containerStyle={{ width: 200,}}
          style={{ borderWidth: 0 }}
          zIndex={1000}
        /> */}
                <Spacer width={5}/>
                <View>
                    <Feather name="chevron-down" size={moderateScale(30)} color="black"/>
                </View>
                <CustomDropDown
                    modalVisible={open}
                    setModalVisible={setOpen}
                    dropData={organizationName}
                    setEventData={setOrgData}
                    leftModal={"0%"}
                    modalWidth={"45%"}
                />
                {/* {
          open&& <View
          style={{
            // height: verticalScale(130),
            width: scale(160),
            minHeight: verticalScale(100),
            maxHeight:verticalScale(120),
            borderRadius: 10,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.black,
            position: "absolute",
            shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
            shadowRadius: 2,
            elevation: 5,
            shadowOpacity: 0.5,
            // inputMarginTop:-20,
            // left:"30%",
            shadowOffset: { width: 1, height: 3 },
            top: verticalScale(30),

          }}
        >
          <ScrollView>
            {organizationName.map((item, index) => {
              return (
                <>
                  <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={()=>{
                    setOpen(false)
                    setOrgData(item.organizationName)

                  }}
                    style={{
                      zIndex:100,

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
                      label={item?.organizationName}
                    />
                  </TouchableOpacity>

                  {dropData.length - 1 == index ? (
                    <></>
                  ) : (
                    <SepratorLine backgroundColor={colors.black} />
                  )}
                </>
              );
            })}
          </ScrollView>
        </View>
        } */}

            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    setOpen(false);
                    setModalVisible(!modalVisible);
                }}
            >
                <Ionicons name="ios-menu" size={moderateScale(35)} color="#134563"/>
            </TouchableOpacity>
            {/* {modalVisible && (
        <> */}
            <CustomDropDown
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                dropData={eventType}
                setEventData={setEventData}
            />
            {/* </>
      )} */}
        </View>);
};

export default SearchHeader;

const styles = StyleSheet.create({});
