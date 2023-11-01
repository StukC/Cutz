import axios from "axios";
import Toast from "react-native-root-toast";
import { URLS } from "./Urls";

export const getEventGroup = async (id) => {
    // console.log(id)6433e77f91f9a8f3766ee760
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.EVENT_GROUP}`);
  } catch (error) {}
};
