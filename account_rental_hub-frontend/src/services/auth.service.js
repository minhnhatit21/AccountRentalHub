import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = async (userData) => {
  console.log(userData)
  try {
    const response = await axios.post(API_URL + "signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error while register:", error);
    throw error;
  }
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;