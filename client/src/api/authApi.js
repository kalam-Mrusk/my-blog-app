import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/blog-app"; // Adjust if needed

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/auth/login`,
      userData,
      {
        withCredentials: true, // Required for cookies to be stored
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
