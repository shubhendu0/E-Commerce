import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/products`;

const getSearchedProducts = async(query) => {
  const response = await axios.get(`${API_URL}/search/${query}`);
  return response.data;
}

const getProducts = async(query) => {
  const response = await axios.get(`${API_URL}/${query}`);
  return response.data;
}

const getProduct = async (query) => {
  const response = await axios.get(`${API_URL}/product/${query}`);
  return response.data;
}


const productService = {
  getSearchedProducts,
  getProducts,
  getProduct
}
export default productService;