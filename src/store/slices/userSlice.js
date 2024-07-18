import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import  URL  from "../../api/url";

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }) => {
    console.log(email, password);
    try {
      const response = await fetch(`${URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ userName, email, password }) => {
    try {
      const response = await fetch(`${URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") && localStorage.getItem('token') !== 'undefined'
    ? localStorage.getItem("token")
    : null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(logIn.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.jwt);
      state.token = action.payload.jwt;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.jwt);
      state.token = action.payload.jwt;
    })
  },
});

export default userSlice.reducer;

export const {removeUser} = userSlice.actions
