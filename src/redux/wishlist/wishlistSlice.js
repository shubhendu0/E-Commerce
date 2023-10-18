import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { 
  addFavorite, 
  updateWishlist, 
  getWishlist 
} from "./wishlistActions";


const initialState = {
  wishlist : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
      reset: (state) => {
        state.wishlist = null;
      },
    },
    extraReducers: (builder) => {
        builder

          //----------------------- Get WishList --------------------//
          .addCase(getWishlist.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
            toast.success("Wishlist Loaded",{
              toastId : "getWishlist"
            });
          })
          .addCase(getWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.wishlist = null;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //------------------------- Add Favorite ---------------------//
          .addCase(addFavorite.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addFavorite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
            toast.success("Item Added to Wishlist",{
              toastId : "addFavorite"
            });
          })
          .addCase(addFavorite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })


          //------------------------- Update Wishlist ---------------------//
          .addCase(updateWishlist.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
            toast.success("Wishlist Updated.",{
              toastId : "updateWishlist"
            });
          })
          .addCase(updateWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload,{
              toastId : "error"
            });
          })
    }
})

export default wishlistSlice.reducer;
export const { reset } = wishlistSlice.actions;