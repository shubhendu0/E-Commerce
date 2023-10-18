import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { 
  addToCart,
  updateCart,
  removeProduct,
  getCart,
  deleteCart
} from "./cartActions";


const initialState = {
  cart : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      reset: (state) => {
        state.cart = null;
      },
    },
    extraReducers: (builder) => {
        builder

          //----------------------- Get Cart --------------------//
          .addCase(getCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cart = action.payload;
            toast.success("Cart Loaded",{
              toastId : "getCart"
            });
          })
          .addCase(getCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.cart = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //------------------------- Add To Cart ---------------------//
          .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cart = action.payload;
            toast.success("Item Added to Cart",{
              toastId : "addToCart"
            });
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //------------------------- Update Cart ---------------------//
          .addCase(updateCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cart = action.payload;
            toast.success("Cart Updated.",{
              toastId : "updateCart"
            });
          })
          .addCase(updateCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })

          //------------------------- Remove Product ---------------------//
          .addCase(removeProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(removeProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cart = action.payload;
            toast.success("Product Removed.",{
              toastId : "removeProduct"
            });
          })
          .addCase(removeProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //------------------------- Delete Cart ---------------------//
          .addCase(deleteCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cart = action.payload;
            toast.success("Cart Deleted.",{
              toastId : "deleteCart"
            });
          })
          .addCase(deleteCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })
    }
})

export default cartSlice.reducer
export const { reset } = cartSlice.actions;