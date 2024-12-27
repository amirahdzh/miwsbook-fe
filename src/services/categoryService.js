import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/category';

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Categories:", error);
    throw error;
  }
};

export const addCategory = async (Category) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, Category, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding Category:", error);
    throw error;
  }
};

export const updateCategory = async (id, Category) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, Category, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating Category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting Category:", error);
    throw error;
  }
};

// Fetch a specific Category by ID
export const fetchCategory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
    throw error;
  }
};

export const getBooksByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/category/${categoryId}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by Category:", error);
    throw error;
  }
};

// export const getAllMovies = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/api/v1/movies'); // Adjust the endpoint if necessary
//     return response.data; // Make sure the response structure is correct
//   } catch (error) {
//     console.error("Error fetching all movies:", error);
//     throw error;
//   }
// };

