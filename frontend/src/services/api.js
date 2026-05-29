import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://incident-management-system-q6qd.onrender.com";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;