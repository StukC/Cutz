import axios from "axios";

export const client=axios.create({
    baseURL: 'https://event-app-production.up.railway.app/',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
})