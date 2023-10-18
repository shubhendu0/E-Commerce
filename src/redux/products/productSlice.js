import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getSearchedProducts,
  getProducts,
  getProduct
} from "./productActions";


const initialState = {
  searchedProducts:[],
  products : [],
  product : {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

          //----------------------- Get Searched Products --------------------//
          .addCase(getSearchedProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getSearchedProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.searchedProducts = action.payload;
            // toast.success("Searched Products Loaded",{
            //   toastId : "getSearchedProducts"
            // });
          })
          .addCase(getSearchedProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.searchedProducts = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //----------------------- Get ProductList --------------------//
          .addCase(getProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload;
            // toast.success("Products Loaded",{
            //   toastId : "getProductList"
            // });
          })
          .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.products = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //------------------------- Get Product ---------------------//
          .addCase(getProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.product = action.payload;
            toast.success("Product Details Loaded.",{
              toastId : "getProduct"
            });
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.product = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })
    }
})

export default productSlice.reducer