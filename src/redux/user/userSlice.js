import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { 
  updateUser, 
  getUser 
} from "./userActions";

const initialState = {
  user : {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      reset: (state) => {
        state.user = null;
      },
    },
    extraReducers: (builder) => {
        builder
          //----------------------- Get User --------------------//
          .addCase(getUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            toast.success("User details fetched.",{
              toastId : "getUser"
            });
          })
          .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //------------------------- Update User ---------------------//
          .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            toast.success("User Details Updated.",{
              toastId : "updateUser"
            });
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })
    }
})

export default userSlice.reducer