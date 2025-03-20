import { publicApi, privateApi } from "../utils/api";

// 🔹 Get all categories (Public)
export const getCategories = async () => {
  try {
    const response = await publicApi.get("/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// 🔹 Get a specific category by ID (Public)
export const fetchCategory = async (id) => {
  try {
    const response = await publicApi.get(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

// 🔹 Add a new category (Requires Authentication)
export const addCategory = async (category) => {
  try {
    const response = await privateApi.post("/category", category);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

// 🔹 Update an existing category (Requires Authentication)
export const updateCategory = async (id, category) => {
  try {
    const response = await privateApi.put(`/category/${id}`, category);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// 🔹 Delete a category (Requires Authentication)
export const deleteCategory = async (id) => {
  try {
    const response = await privateApi.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// 🔹 Get books by category ID (Public)
export const getBooksByCategory = async (categoryId) => {
  try {
    const response = await publicApi.get(`/category/${categoryId}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books by category:", error);
    throw error;
  }
};
