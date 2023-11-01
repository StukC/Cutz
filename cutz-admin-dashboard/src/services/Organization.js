import axios from "axios";
import { Urls as Urls } from "utilities/Urls";
// import { Urls } from "utilities/Urls";

export const getOrganizations = async () => {
  try {
    return await axios.get(`${Urls.BaseUrl}${Urls.ORGANIZATION}`);
  } catch (error) {}
};

export const getAdminOrganizations = async () => {
  try {
    return await axios.get(`${Urls.BaseUrl}${Urls.ORGANIZATION_ADMIN}`);
  } catch (error) {}
};
export const createOrganization = async (data) => {
  try {
    return await axios.post(`${Urls.BaseUrl}${Urls.ORGANIZATION}`, data);
  } catch (error) {}
};
export const getOrganizationById = async (id) => {
  try {
    return await axios.get(`${Urls.BaseUrl}${Urls.ORGANIZATION}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
