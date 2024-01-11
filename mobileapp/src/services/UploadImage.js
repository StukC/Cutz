import axios from "axios";
import { URLS } from "./Urls";

export const UploadImage = async (imageUri) => {
    // Create a new FormData object
    const formData = new FormData();
  
    // Append the image file to the FormData object
    formData.append('image', {
      uri: imageUri?.assets[0]?.uri,
      name: 'image.jpg',
      type: 'image/jpeg'
    });
  
    try {
      // Make a POST request to the server with the FormData object
      const response = await fetch(`${URLS.BASE_URL}api/v1/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
