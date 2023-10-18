import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/wishlist`;

const addFavorite = async(data) => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
}

const updateWishlist = async(query) => {
  const response = await axios.put(`${API_URL}/update/${query}`);
  return response.data;
}

const getWishlist = async(query) => {
  const response = await axios.get(`${API_URL}/${query}`);
  return response.data;
}

const wishlistService = {
  addFavorite,
  updateWishlist,
  getWishlist
}
export default wishlistService;