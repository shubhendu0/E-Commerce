import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from "./userServices";

// Get User
export const getUser = createAsyncThunk(
    "/user",
    async (userId, thunkAPI) => {
      try {
        return await userService.getUser(userId);
      } 
      catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
)


// Update User
export const updateUser = createAsyncThunk(
  "/user/update",
  async (data, thunkAPI) => {
    try {
      return await userService.updateUser(data);
    } 
    catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)



