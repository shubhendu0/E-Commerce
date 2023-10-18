import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/cart`;


const addToCart = async(data) => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
}

const updateCart = async(data) => {
  const response = await axios.put(`${API_URL}/update/${data.query}`, data.productData);
  return response.data;
}

const removeProduct = async(query) => {
  const response = await axios.put(`${API_URL}/remove/${query}`);
  return response.data;
}

const getCart = async(userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
}

const deleteCart = async(userId) => {
    const response = await axios.delete(`${API_URL}/delete/${userId}`);
    return response.data;
  }

const cartService = {
  addToCart,
  updateCart,
  removeProduct,
  getCart,
  deleteCart
}
export default cartService;