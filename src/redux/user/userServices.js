import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/user`;

const getUser = async(userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
}

const updateUser = async(data) => {
  const response = await axios.put(`${API_URL}/update/${data.userId}`, data.userData);
  return response.data;
}

const userService = {
  getUser,
  updateUser
}
export default userService;