import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thunks for API interactions
export const fetchExamCategories = createAsyncThunk(
  "examCategory/fetchExamCategories",
  async () => {
    const response = await axiosInstance.get("/exam-category");
    return response.data; // Axios returns the data directly
  }
);

export const addExamCategory = createAsyncThunk(
  "examCategory/addExamCategory",
  async (formData) => {
    console.log("formData", formData);
    const response = await axiosInstance.post("/exam-category", formData, {
      headers: {
        "Content-Type": "application/json", // Ensure proper handling of FormData
      },
    });
    return response.data;
  }
);

export const updateExamCategory = createAsyncThunk(
  "examCategory/updateExamCategory",
  async (formData) => {
    const {id } = formData;
    const response = await axiosInstance.put(`/exam-category/${id}`, formData, {
      headers: {
        "Content-Type": "application/json", // Ensure proper handling of FormData
      },
    });
    return response.data;
  }
);

export const deleteExamCategory = createAsyncThunk(
  "examCategory/deleteExamCategory",
  async (id) => {
    await axiosInstance.delete(`/exam-category/${id}`);
    return id;
  }
);

// Slice
const examCategorySlice = createSlice({
  name: "examCategory",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchExamCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchExamCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Category
      .addCase(addExamCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExamCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addExamCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Category
      .addCase(updateExamCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExamCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateExamCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Category
      .addCase(deleteExamCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExamCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteExamCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default examCategorySlice.reducer;
