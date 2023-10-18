import { createAsyncThunk } from '@reduxjs/toolkit'
import wishlistService from "./wishlistServices";


// Add To Wishlist
export const addFavorite = createAsyncThunk(
  "/wishlist/add",
  async (data, thunkAPI) => {
    try {
      return await wishlistService.addFavorite(data);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)


// Update Wishlist
export const updateWishlist = createAsyncThunk(
  "/wishlist/update",
  async (query, thunkAPI) => {
    try {
      return await wishlistService.updateWishlist(query);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)


// Get Wishlist
export const getWishlist = createAsyncThunk(
    "/wishlist",
    async (query, thunkAPI) => {
      try {
        return await wishlistService.getWishlist(query);
      } 
      catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
)

