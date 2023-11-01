import axios from "axios";
import { URLS } from "./Urls";

export const getEventGroup = async (id) => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.EVENT_GROUP}`);
  } catch (error) {}
};

export const getEventGroupById = async (id) => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.EVENT_GROUP}/${id}`);
  } catch (error) {}
};
export const getEventGroupTimes = async (id) => {
    // console.log(id)6433e77f91f9a8f3766ee760
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.EVENT_GROUP}/count/${id}`);
  } catch (error) {}
};
