import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filters,
    cart,
    pizza,
  },
});
