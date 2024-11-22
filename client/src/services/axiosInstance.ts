import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5071/api" : "https://api.telehealth.duckdns.org/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
