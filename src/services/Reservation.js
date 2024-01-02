import axios from "axios";
import Toast from "react-native-root-toast";
import {URLS} from "./Urls";

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
    } catch (error) {
    }
};

export const getReservationClientWithAllDetails = async (token) => {
    try {
        return await axios.get(
            `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_CLIENT}/reservations`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
    } catch (error) {
    }
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
    } catch (error) {
    }
};

export const getReservationVolunteerWithAllDetails = async (token) => {
    try {
        return await axios.get(
            `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_VOLUNTEER}/reservations`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
    } catch (error) {
    }
};

export const postEventReservationClient = async (data, token) => {
    const options = {
        method: "POST",
        url: `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_CLIENT}`,
        headers: {Accept: "application/json", Authorization: "Bearer " + token},
        data: data,
    };
    try {
        return await axios.request(options);
    } catch (error) {
    }
};
export const postEventReservationVolunteer = async (data, token) => {
    const options = {
        method: "POST",
        url: `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_VOLUNTEER}`,
        headers: {Accept: "application/json", Authorization: "Bearer " + token},
        data: data,
    };
    try {
        return await axios.request(options);
    } catch (error) {
    }
};
export const updateCheckInAndCheckOutClient = async (data, token, id) => {
    const options = {
        method: "PATCH",
        url: `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_CLIENT}/${id}`,
        headers: {Accept: "application/json", Authorization: "Bearer " + token},
        data: data,
    };
    try {
        return await axios.request(options);
    } catch (error) {
    }
}

export const updateCheckInAndCheckOutVolunteer = async (data, token, id) => {
    const options = {
        method: "PATCH",
        url: `${URLS.BASE_URL}${URLS.EVENTS_RESERVATION_VOLUNTEER}/${id}`,
        headers: {Accept: "application/json", Authorization: "Bearer " + token},
        data: data,
    };
    try {
        return await axios.request(options);
    } catch (error) {
    }
};
