import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { CartState, CartItem } from "../../types";
import { sizes } from "../../data.json"

const initialState: CartState = {
  cartItems: [],
  isCheckout: false
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>, qty: number = 1): void  => {
      const existingCartId = state.cartItems.findIndex(cart => cart.id === action.payload.id);
      if (existingCartId !== -1) {
        state.cartItems[existingCartId].qty += qty;
      } else {
        const selectedSize = sizes.find(size => size.name === action.payload.size); // Find selected size
        const calculateToppings = action.payload.toppings.reduce((total, item) => total + item.price, 0)
        if (selectedSize) {
          const updatedCartItem = {
            ...action.payload,
            qty,
            price: selectedSize.price + calculateToppings // Update price based on selected size
          };
          
          state.cartItems.push(updatedCartItem);
        } else {
          console.error("Selected size not found");
        }
      }
    },    
    removeCartItem: (state, action: PayloadAction<number>): void => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
    clearCartItems: (state): void => {
      state.cartItems = []
    },
    isCheckoutCart: (state, action: PayloadAction<boolean>): void => {
      state.isCheckout = action.payload
    }
  },
});

export const { addToCart, removeCartItem, isCheckoutCart, clearCartItems } =
  cartSlice.actions;
export const selectCount = (state: RootState) => state.cart;
export default cartSlice.reducer;

