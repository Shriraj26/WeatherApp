import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
  timeout: 1000,
});

export default instance;
