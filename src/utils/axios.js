import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.weatherapi.com/v1/forecast.json?key=8ba41d1e2d934150b6b204730233006`,
  timeout: 1000,
});

export default instance;
