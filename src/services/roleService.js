import axios from 'axios';

const API_URL = 'https://laravue-bookworld.vercel.app/api/v1/role';

// Setup Axios to include the token in the headers dynamically
const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getRoles = async () => {
  try {
    const response = await instance.get('/');
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

export const createRole = async (role) => {
  try {
    const response = await instance.post('/', role);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

export const updateRole = async (id, role) => {
  try {
    const response = await instance.put(`/${id}`, role);
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await instance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};
