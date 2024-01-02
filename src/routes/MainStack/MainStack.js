// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Image, Platform, Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomText from "../../components/CustomText";
import MakeReservation from "../../screens/MainScreens/MakeReservation/MakeReservation";
import WelcomeScreen from "../../screens/MainScreens/WelcomeScreen/WelcomeScreen";
import { colors } from "../../utils/Colors";
import { icons } from "../../../assets/icons";
import SearchScreen from "../../screens/MainScreens/SearchScreen/SearchScreen";
import ReceiptScreen from "../../screens/MainScreens/ReceiptScreen/ReceiptScreen";
import ProfileScreen from "../../screens/MainScreens/ProfileScreen/PofileScreen";
import EventLocations from "../../screens/MainScreens/EventLocation/EventLocations";
import PersonalScreen from "../../screens/MainScreens/PersonalScreen/PersonalScreen";
import EditProfile from "../../screens/MainScreens/EditProfile/EditProfile";
import ManageNotification from "../../screens/MainScreens/ManageNotification/ManageNotification";
import ProfileStack from "../ProfileStack/ProfileStack";
import TicketOtp from "../../screens/MainScreens/TicketOtp/TicketOtp";

const Tab = createBottomTabNavigator();

const MainStack = ({ route }) => {
  console.log("RoutesType", route?.params);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: verticalScale(Platform.OS == "ios" ? 55 : 50),
          paddingTop: Platform.OS == "ios" ? 10 : 0,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray1,
          display: route.name === "Event" ? "none" : "flex",
        },
        headerShown: false,
        tabBarLabel: ({ focused, size, color }) => {
          return false;
        },

        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Welcome") {
            iconName = icons.home;
            // size = focused ? 35 : 30;
            color = focused ? colors.primary : colors.secondary;
          } else if (route.name === "Search") {
            iconName = icons.search;
            // size = focused ? 35 : 30;
            color = focused ? colors.primary : colors.secondary;
          } else if (route.name === "Receipt") {
            iconName = icons.receipt;
            color = focused ? colors.primary : colors.secondary;

            // size = focused ? 35 : 30;
          } else if (
            route.name === "Profile"
          ) {
            iconName = icons.user;
            // size = focused ? 35 : 30;
            color = focused ? colors.primary : colors.secondary;
          }
          return (
            <Image
              source={iconName}
              resizeMode={"contain"}
              style={{
                tintColor: color,
                height: scale(30),
                width: scale(30),
                marginVertical: 10,
              }}
            />
          );
        },
      })}
      // initialRouteName={"Receipt"}
    >
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Receipt" component={ReceiptScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen
        options={{
          tabBarItemStyle: { display: "none" },
        }}
        name="TicketOtp"
        component={TicketOtp}
      />
      <Tab.Screen
        options={{
          tabBarItemStyle: { display: "none" },
        }}
        name="Event"
        component={EventLocations}
      />
     
    </Tab.Navigator>
  );
};

export default MainStack;
