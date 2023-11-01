import axios from "axios";
import { Urls } from "utilities/Urls";

export const client = axios.create({
  baseURL: "https://event-app-production.up.railway.app/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  responseType: "json",
});

export const getClients = async () => {
  try {
    return await axios.get(`${Urls.BaseUrl}${Urls.GET_CLIENT_ALL}`);
  } catch (error) {}
};
export const getVolunteer = async () => {
  try {
    return await axios.get(`${Urls.BaseUrl}${Urls.GET_VOLUNTEER_ALL}`);
  } catch (error) {}
};
export const delAdmin = async (id, token) => {
  return await axios.delete(`${Urls.BaseUrl}api/v1/admin/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const delClient = async (id, token) => {
  return await axios.delete(`${Urls.BaseUrl}api/v1/client/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const banClient = async (id, token) => {
  return await axios.patch(
    `${Urls.BaseUrl}api/v1/client/${id}`,
    { activeStatus: "false" },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
export const unBanClient = async (id, token) => {
  return await axios.patch(
    `${Urls.BaseUrl}api/v1/client/${id}`,
    { activeStatus: "true" },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
export const delVolunteer = async (id, token) => {
  return await axios.delete(`${Urls.BaseUrl}api/v1/volunteer/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const banVolunteer = async (id, token) => {
  return await axios.patch(
    `${Urls.BaseUrl}api/v1/volunteer/${id}`,
    { activeStatus: "false" },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
export const unBanVolunteer = async (id, token) => {
  return await axios.patch(
    `${Urls.BaseUrl}api/v1/volunteer/${id}`,
    { activeStatus: "true" },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const delClientReservation = async (id, token) => {
  return await axios.delete(
    `${Urls.BaseUrl}api/v1/eventreservationclient/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const delVolunteerReservation = async (id, token) => {
  return await axios.delete(
    `${Urls.BaseUrl}api/v1/eventreservationvolunteer/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
