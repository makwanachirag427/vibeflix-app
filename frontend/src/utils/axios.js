import axios from "axios";

const backendURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://vibeflix-app-production.up.railway.app";

const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

export default  axiosInstance;
