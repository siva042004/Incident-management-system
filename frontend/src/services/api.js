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

export const incidentAPI = {
  getAll: () => api.get("/incidents"),
  getById: (id) => api.get(`/incidents/${id}`),
  create: (data) => api.post("/incidents", data),
  update: (id, data) => api.put(`/incidents/${id}`, data),
  delete: (id) => api.delete(`/incidents/${id}`),
};

export default api;