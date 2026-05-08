import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const incidentAPI = {
    getAll: () => API.get('/incidents'),
    getById: (id) => API.get(`/incidents/${id}`),
    create: (data) => API.post('/incidents', data),
    update: (id, data) => API.put(`/incidents/${id}`, data),
    delete: (id) => API.delete(`/incidents/${id}`)
};
