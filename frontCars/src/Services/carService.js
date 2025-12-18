import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL
console.log("API_URL =", API_URL);
export const carService = {
    getAll: () => axios.get(API_URL),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    create: (data) => axios.post(`${API_URL}/create`, data),
    update: (id, data) => axios.put(`${API_URL}/update/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/${id}`)
};