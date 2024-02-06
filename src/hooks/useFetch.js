import React from "react";
import axios from "axios";

const useFetch = () => {
  return async (cityName) => {
    const options = {
      method: "GET",
      url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
      params: { city: `${cityName}` },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_WHEATHER_API_KEY,
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
};

export default useFetch;
