import axios from "axios";
import { URLS } from "./Urls";

export const getDescription = async (token) => {
  try {
    return await axios.get(`${URLS.BASE_URL}api/v1/description`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {}
};
