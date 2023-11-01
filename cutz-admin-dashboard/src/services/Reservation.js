import axios from "axios";
import Toast from "react-native-root-toast";
import { URLS } from "./Urls";

export const getReservationClient = async (token) => {
  try {
    return await axios.get(
      `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_CLIENT}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {}
};
export const getReservationVolunteer = async (token) => {
  try {
    return await axios.get(
      `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_VOLUNTEER}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {}
};

export const postEventReservationClient = async (data, token) => {
  const options = {
    method: "POST",
    url: `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_CLIENT}`,
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
    data: data,
  };
  try {
    return await axios.request(options);
  } catch (error) {}
};
export const postEventReservationVolunteer = async (data, token) => {
  const options = {
    method: "POST",
    url: `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_VOLUNTEER}`,
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
    data: data,
  };
  try {
    return await axios.request(options);
  } catch (error) {}
};
