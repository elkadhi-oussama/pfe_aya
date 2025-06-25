import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Récupérer tous les utilisateurs
export const getusers = createAsyncThunk("users/get", async () => {
  try {
    const response = await axios.get(
      "https://pfe2025-api.vercel.app/user/allusers"
    );
    return response.data; // ✅ retourne uniquement les données JSON
  } catch (error) {
    console.error(error);
    throw error; // pour déclencher le rejected
  }
});

export const getFilteredUsers = createAsyncThunk(
  "users/filtered",
  async (filters) => {
    try {
      const params = new URLSearchParams();
      if (filters.age) params.append("age", filters.age);
      if (filters.institut) params.append("institut", filters.institut);
      if (filters.about) params.append("about", filters.about);

      const res = await axios.get(
        `https://pfe2025-api.vercel.app/user/filter?${params.toString()}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const initialState = {
  users: null,
  status: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getusers.pending]: (state) => {
      state.status = "pending";
    },
    [getusers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.users = action.payload.users; // ✅ directement depuis payload
    },
    [getusers.rejected]: (state) => {
      state.status = "rejected";
    },
    [getFilteredUsers.pending]: (state) => {
      state.status = "pending";
    },
    [getFilteredUsers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.users = action.payload.users;
    },
    [getFilteredUsers.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default usersSlice.reducer;
