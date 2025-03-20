import { privateApi } from "../utils/api";

// ✅ Get All Roles (Butuh Autentikasi)
export const getRoles = async () => {
  try {
    const response = await privateApi.get("/role");
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

// ✅ Create Role (Butuh Autentikasi)
export const createRole = async (roleData) => {
  try {
    const response = await privateApi.post("/role", roleData);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

// ✅ Update Role (Butuh Autentikasi)
export const updateRole = async (id, roleData) => {
  try {
    const response = await privateApi.put(`/role/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

// ✅ Delete Role (Butuh Autentikasi)
export const deleteRole = async (id) => {
  try {
    await privateApi.delete(`/role/${id}`);
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};
