import axios from "axios";
import Toast from "react-native-root-toast";
import { URLS } from "./Urls";

export const getTimings= async () => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.TIMING}`);
  } catch (error) {}
};
export const getTimingBy= async (id) => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.TIMING}/${id}`);
  } catch (error) {}
};
