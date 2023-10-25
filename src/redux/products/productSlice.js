import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getSearchedProducts,
  getProducts,
  getProduct
} from "./productActions";

const initialState = {
  searchedProducts: [],
  products : [],
  hasMore: true,
  pageLoading: false,
  product : {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const uniqueList = (products) => {
  const newArr = [...new Set(products)];
  return newArr;
}

const mergeArraysAndRemoveDuplicates = (originalArray, newArray, key) => {
   // Create a Map to store items by a unique key
   const mergedMap = new Map();
   // Add items from the original array to the Map
   for (const item of originalArray) {
     mergedMap.set(item[key], item);
   }
   // Add items from the newer array, replacing duplicates if found
   for (const item of newArray) {
     mergedMap.set(item[key], item);
   } 
   // Convert the Map values back to an array
   const mergedArray = Array.from(mergedMap.values());
   return mergedArray;
}


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      setPage: (state, action) => {
        state.page = action.payload;
      },
      resetProducts: (state) => {
        state.products = null;
      },
      setHasMore: (state) => {       
        state.hasMore = true;
      }
    },
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
            state.pageLoading = true;
            state.hasMore = true;
            state.products = uniqueList(state.products)
          })
          .addCase(getProducts.fulfilled, (state, action) => {
            state.pageLoading = false;
            state.isSuccess = true;
            state.products = mergeArraysAndRemoveDuplicates(state.products, action.payload, '_id');
            state.hasMore = action.payload.length < 16 ? false : true;
            // toast.success("Products Loaded",{
            //   toastId : "getProductList"
            // });
          })
          .addCase(getProducts.rejected, (state, action) => {
            state.pageLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.hasMore = false;
            // toast.error(action.payload,{
            //   toastId : "error"
            // });
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

export const { setPage, resetProducts, setHasMore } = productSlice.actions;
export default productSlice.reducer
