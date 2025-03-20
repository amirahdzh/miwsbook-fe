import { publicApi, privateApi } from "../utils/api";

// API Public: Get All Authors
export const getAuthors = async () => {
  try {
    const response = await publicApi.get("/author");
    return response;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

// API Public: Get Author by ID
export const getAuthorById = async (id) => {
  try {
    const response = await publicApi.get(`/author/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching author details:", error);
    throw error;
  }
};

// API Private: Add New Author (butuh autentikasi)
export const addAuthor = async (formData) => {
  try {
    const response = await privateApi.post("/author", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding author:", error);
    throw error;
  }
};

// API Private: Update Author (butuh autentikasi)
export const updateAuthor = async (id, formData) => {
  try {
    const response = await privateApi.post(
      `/authors/${id}?_method=PUT`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

// API Private: Delete Author (butuh autentikasi)
export const deleteAuthor = async (id) => {
  try {
    await privateApi.delete(`/author/${id}`);
  } catch (error) {
    console.error("Error deleting author:", error);
    throw error;
  }
};
