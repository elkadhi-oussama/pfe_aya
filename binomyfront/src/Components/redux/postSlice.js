import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Récupérer tous les posts
export const fetchPosts = createAsyncThunk("post/fetch", async () => {
  const res = await axios.get("https://pfe-aya.onrender.com/post");
  return res.data; // on suppose que c’est un tableau direct
});

// Ajouter un post
export const addPost = createAsyncThunk("post/add", async (postData) => {
  const res = await axios.post(
    "https://pfe-aya.onrender.com/post/add",
    postData
  );
  return res.data;
});

// Supprimer un post
export const deletePost = createAsyncThunk("post/delete", async (id) => {
  await axios.delete(`https://pfe-aya.onrender.com/post/${id}`);
  return id;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.postList = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.status = "failed";
    },

    [addPost.fulfilled]: (state, action) => {
      state.postList.unshift(action.payload);
    },

    [deletePost.fulfilled]: (state, action) => {
      state.postList = state.postList.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});

export default postSlice.reducer;
