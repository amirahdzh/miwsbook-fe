import axios from "axios";

const API_URL = "https://laravue-bookworld.vercel.app/public/api/v1/book";

// Fungsi untuk mendapatkan header otorisasi
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getBooks = async (page = 1, perPage = 20) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, per_page: perPage }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};


export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

export const addBook = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      ...getAuthHeaders(),
      headers: {
        ...getAuthHeaders().headers,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error adding book:", error);
    }
    throw error;
  }
};

export const updateBook = async (id, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id}?_method=PUT`,
      formData,
      {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          // "Content-Type": "multipart/form-data",
          // Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error updating book:", error);
    }
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      ...getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/books/search`, {
      params: {
        query
      }
    });
    return response;
  } catch (error) {
    throw new Error('Error searching books');
  }
};