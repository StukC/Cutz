import axios from "axios";
import { Urls } from "utilities/Urls";

export const getEvent = async () => {
 return await axios
    .get(Urls.BaseUrl + Urls.GET_EVENTS)
    
};
export const createEvent = async (data) => {
 return await axios
    .post(`${Urls.BaseUrl}${Urls.GET_EVENTS}`,data)  
};
export const delEvent = async (id) => {
 return await axios
    .delete(`${Urls.BaseUrl}${Urls.GET_EVENTS}/${id}`)  
};
