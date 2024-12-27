import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Function to get headers with auth token
const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  };
};

export const getUsers = () => {
  return axios.get(`${API_URL}/users`, getHeaders());
};

export const getUsersByRole = (roleId) => {
  return axios.get(`${API_URL}/user/role/${roleId}`, getHeaders());
};

export const updateUser = (userId, data) => {
  return axios.put(`${API_URL}/user/${userId}`, data, getHeaders());
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/user/${userId}`, getHeaders());
};

export const addUser = (data) => {
  return axios.post(`${API_URL}/user`, data, getHeaders());
};
