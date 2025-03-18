import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/auth";

export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation,
    });
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return { token, user };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// export const regenerateOtp = async (email) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.post(
//       `${API_URL}/generate-otp-code`,
//       { email },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error during OTP regeneration:", error);
//     throw error;
//   }
// };

export const logout = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return response.data;
};

export const isAuthenticated = () => {
  // Check for token or user data in localStorage or sessionStorage
  return !!localStorage.getItem("token");
};

// Function to get the current user ID
export const getUserId = () => {
  // Implement logic to get user ID, e.g., from localStorage or a Vuex store
  return localStorage.getItem("user_id");
};
