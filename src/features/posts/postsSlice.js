import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { formatPostsForUI } from "../../formatters/postsFormatter";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// initial State
const initialState = {
  error: null,
  status: "idle", // idle, loading, succeeded, failed
  posts: [],
};

// async actions
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});
export const createPost = createAsyncThunk(
  "posts/addPost",
  async (postInfo) => {
    const response = await axios.post(POSTS_URL, postInfo);
    return response.data;
  }
);

// slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, body, author) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            author: Number(author),
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction: {
      reducer(state, action) {
        const { postId, reaction } = action.payload;
        const existingPost = state.posts.find((post) => post.id === postId);
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      },
      prepare(postId, reaction) {
        return {
          payload: {
            postId,
            reaction,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          return formatPostsForUI(post, min++);
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        const formattedPost = formatPostsForUI(action.payload);
        formattedPost.id = state.posts.length + 1;
        state.posts.push(formattedPost);
      });
  },
});

export default postsSlice.reducer;
export const { addPost, addReaction } = postsSlice.actions;

// selectors
export const postsSelector = (state) => state.posts.posts;
export const errorSelector = (state) => state.posts.error;
export const statusSelector = (state) => state.posts.status;
