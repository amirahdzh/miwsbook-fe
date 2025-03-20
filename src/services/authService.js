import { publicApi, privateApi } from "../utils/api";

export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  try {
    const response = await publicApi.post("/auth/register", {
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
    const response = await publicApi.post("/auth/login", { email, password });
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

export const logout = async () => {
  try {
    const response = await privateApi.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserId = () => {
  return localStorage.getItem("user_id");
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
