  // This slice to set user credentials in local storage and remove them

  import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //if userinfo in local storage use that else return null
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // for local storage
    logout:(state,action)=> {
      state.userInfo=null;
      localStorage.removeItem('userInfo')
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;