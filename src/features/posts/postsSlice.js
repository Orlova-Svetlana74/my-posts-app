import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return response.data;
});

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return { postId, comments: response.data };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    editingPost: null,
    comments: {},
    filter: {
      title: '',
      userId: '',
      favorite: false,
    },
    sort: {
      field: 'id',
      direction: 'asc',
    },
    users: [],
  },
  reducers: {
    startEditing(state, action) {
      state.editingPost = action.payload;
    },
    cancelEditing(state) {
      state.editingPost = null;
    },
    savePost(state, action) {
      const { id, title, body, userId } = action.payload;
      const existingPost = state.items.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
        existingPost.userId = userId;
      }
      state.editingPost = null;
    },
    deletePost(state, action) {
      state.items = state.items.filter((post) => post.id !== action.payload);
    },
    toggleFavorite(state, action) {
      const existingPost = state.items.find(
        (post) => post.id === action.payload
      );
      if (existingPost) {
        existingPost.isFavorite = !existingPost.isFavorite;
      }
    },
    toggleComments(state, action) {
      const postId = action.payload;
      if (state.comments[postId]) {
        delete state.comments[postId];
      } else {
        state.comments[postId] = null; // Placeholder for async comments loading
      }
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    addPost(state, action) {
      state.items.push({
        ...action.payload,
        id: state.items.length + 1,
        isFavorite: false,
      });
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments[postId] = comments;
      });
  },
});

export const {
  startEditing,
  cancelEditing,
  savePost,
  deletePost,
  toggleFavorite,
  toggleComments,
  setFilter,
  setSort,
  addPost,
  setUsers,
} = postsSlice.actions;

export default postsSlice.reducer;
