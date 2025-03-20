import { privateApi } from "../utils/api";

// ✅ Get All Users (Butuh Autentikasi)
export const getUsers = async () => {
  try {
    const response = await privateApi.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// ✅ Get Users by Role ID (Butuh Autentikasi)
export const getUsersByRole = async (roleId) => {
  try {
    const response = await privateApi.get(`/user/role/${roleId}`);
    return response;
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error;
  }
};

// ✅ Update User (Butuh Autentikasi)
export const updateUser = async (userId, userData) => {
  try {
    const response = await privateApi.put(`/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// ✅ Delete User (Butuh Autentikasi)
export const deleteUser = async (userId) => {
  try {
    await privateApi.delete(`/user/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// ✅ Add New User (Butuh Autentikasi)
export const addUser = async (userData) => {
  try {
    const response = await privateApi.post("/user", userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
