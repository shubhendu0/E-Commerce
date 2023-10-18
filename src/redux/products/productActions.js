import { createAsyncThunk } from '@reduxjs/toolkit'
import productServices from "./productServices";

export const getSearchedProducts = createAsyncThunk(
  "/products/search",
  async (query, thunkAPI) => {
    try {
      return await productServices.getSearchedProducts(query);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const getProducts = createAsyncThunk(
    "/products",
    async (query, thunkAPI) => {
      try {
        return await productServices.getProducts(query);
      } 
      catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
)


export const getProduct = createAsyncThunk(
  "/products/product",
  async (query, thunkAPI) => {
    try {
      return await productServices.getProduct(query);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)