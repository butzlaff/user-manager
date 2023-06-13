import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  isAdmin: false,
  users: [],
};

export const userSlice = createSlice({
  name: 'user ',
  initialState,
  reducers: {
    addUser: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    resetData: () => ({
      name: '',
      email: '',
      isAdmin: false,
      users: [],
    }),
  },
});

// Action creators are generated for each case reducer function
export const { addUser, resetData } = userSlice.actions;

export default userSlice.reducer;
