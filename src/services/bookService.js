import { publicApi, privateApi } from "../utils/api";

// API Public: Get Books
export const getBooks = async (page = 1, perPage = 20) => {
  try {
    const response = await publicApi.get("/book", {
      params: { page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// API Public: Get Book by ID
export const getBookById = async (id) => {
  try {
    const response = await publicApi.get(`/book/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

// API Private: Add Book (butuh autentikasi)
export const addBook = async (formData) => {
  try {
    const response = await privateApi.post("/book", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

// API Private: Update Book (butuh autentikasi)
export const updateBook = async (id, formData) => {
  try {
    const response = await privateApi.post(`/book/${id}?_method=PUT`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// API Private: Delete Book (butuh autentikasi)
export const deleteBook = async (id) => {
  try {
    await privateApi.delete(`/book/${id}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

// API Public: Search Books
export const searchBooks = async (query) => {
  try {
    console.log("Sending API request to:", `/books/search?query=${query}`);
    const response = await publicApi.get(`/books/search`, {
      params: { query },
    });
    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
