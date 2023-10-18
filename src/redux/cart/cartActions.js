import { createAsyncThunk } from '@reduxjs/toolkit'
import cartService from "./cartService";


// Add To Wishlist
export const addToCart = createAsyncThunk(
  "/cart/add",
  async (data, thunkAPI) => {
    try {
      return await cartService.addToCart(data);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)


// Update Wishlist
export const updateCart = createAsyncThunk(
  "/cart/update",
  async (data, thunkAPI) => {
    try {
      return await cartService.updateCart(data);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)


// Get Wishlist
export const getCart = createAsyncThunk(
    "/cart",
    async (id, thunkAPI) => {
      try {
        return await cartService.getCart(id);
      } 
      catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
)

// Remove Product
export const removeProduct = createAsyncThunk(
  "/cart/remove",
  async (query, thunkAPI) => {
    try {
      return await cartService.removeProduct(query);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// Delete Cart
export const deleteCart = createAsyncThunk(
    "/cart/delete",
    async (id, thunkAPI) => {
      try {
        return await cartService.deleteCart(id);
      } 
      catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
)
