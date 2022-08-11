import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      status: 'checking', // "authenticated", "not-authenticated"
      user: {},
      errorMsg: undefined,
   },
   reducers: {
      onChecking: (state) => {
         state.status = 'checking';
         state.user = {};
         state.errorMsg = undefined;
      },

      onLogin: (state, { payload }) => {
         state.status = 'authenticated';
         state.user = payload;
         state.errorMsg = undefined;
      },

      onLogout: (state, { payload }) => {
         state.status = 'not-authenticated';
         state.user = {};
         state.errorMsg = payload;
      },

      clearErrorMsg: (state) => {
         state.errorMsg = undefined;
      }
   },

});

export const { onChecking, onLogin, onLogout, clearErrorMsg } = authSlice.actions;