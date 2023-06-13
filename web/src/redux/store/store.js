import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slicer/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
