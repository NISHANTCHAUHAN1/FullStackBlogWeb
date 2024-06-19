import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";

const initialState = {
  posts: [],
  error: null,
};

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  try {
    const response = await appwriteService.getPosts();
    return response.documents;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    allPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      const updatedPostIndex = state.posts.findIndex(
        (post) => post.$id === action.payload
      );
      if (updatedPostIndex !== -1) {
        state.posts[updatedPostIndex] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      // update state with fetched data if needed
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { allPosts, addPost, removePost, updatePost } = postSlice.actions;
export default postSlice.reducer;
