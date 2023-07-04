import axios from "axios";
import axiosRetry from "axios-retry";

const URI = process.env.REACT_APP_SOCKET_URI || "http://localhost:3000";

const api = axios.create({
  baseURL: URI,
  
});


export { api };
