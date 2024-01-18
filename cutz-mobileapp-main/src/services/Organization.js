import axios from "axios";
import Toast from "react-native-root-toast";
import { URLS } from "./Urls";

export const getOrganizations = async () => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.ORGANIZATION}`);
  } catch (error) {}
};
export const getOrganizationById = async (id) => {
  try {
    return await axios.get(`${URLS.BASE_URL}${URLS.ORGANIZATION}/${id}`);
  } catch (error) {}
};
