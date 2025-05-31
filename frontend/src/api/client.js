import axios from "axios";
const client = axios.create({
  baseURL: "https://dental-xray-backend.onrender.com",
});

export default client;
