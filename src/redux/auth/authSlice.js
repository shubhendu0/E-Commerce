import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  register,
  login,
  getLoginStatus,
  getUser,
  logout,
  loginWithGoogle
} from "./authActions";

const initialState = {
  isLoggedIn: false,
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
          //----------------------- Register User ---------------//
          .addCase(register.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.user = action.payload;
            toast.success("Registration Successful");
            console.log(action.payload);
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })
    
          // -------------------------- Login User ----------------//
          .addCase(login.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.user = action.payload;
            toast.success("Login Successful");
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })

          //-------------------------- Get Login Status -----------------//
          .addCase(getLoginStatus.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getLoginStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = action.payload;
            console.log(action.payload);
          })
          .addCase(getLoginStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })         
 
          
          //----------------------------- Get User -------------------//
          .addCase(getUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.user = action.payload;
          })
          .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //--------------------------- Logout User ------------------//
          .addCase(logout.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = false;
            state.user = null;
            toast.success(action.payload);
          })
          .addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })

          //------------------------------ loginWithGoogle -----------------------//
        .addCase(loginWithGoogle.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.user = action.payload;
            toast.success("Login Successful");
        })
        .addCase(loginWithGoogle.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
            toast.error(action.payload,{
              toastId : "error"
            });
        });
    }
})

export default authSlice.reducer