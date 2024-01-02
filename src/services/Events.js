import axios from "axios";
import Toast from "react-native-root-toast";
import { URLS } from "./Urls";

export const getEvents = async () => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.GET_EVENTS}`);
  } catch (error) {}
};
export const getEventById = async (id) => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.GET_EVENTS}/${id}`);
  } catch (error) {}
};

export const getHomeScreenData = async (id) => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.GET_EVENTS}/home/${id}`);
  } catch (error) {}
};
