import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Thunks for API interactions
export const fetchExamCategories = createAsyncThunk(
  "examCategory/fetchExamCategories",
  async () => {
    const response = await fetch(`${BASE_URL}/exam-category`);
    const data = await response.json();
    return data;
  }
);

export const addExamCategory = createAsyncThunk(
  "examCategory/addExamCategory",
  async (newCategory) => {
    const response = await fetch(`${BASE_URL}/exam-category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    const data = await response.json();
    return data;
  }
);

export const updateExamCategory = createAsyncThunk(
  "examCategory/updateExamCategory",
  async ({ id, name }) => {
    const response = await fetch(`${BASE_URL}/exam-category/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteExamCategory = createAsyncThunk(
  "examCategory/deleteExamCategory",
  async (id) => {
    await fetch(`${BASE_URL}/exam-category/${id}`, { method: "DELETE" });
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
      .addCase(addExamCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      // Update Category
      .addCase(updateExamCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      // Delete Category
      .addCase(deleteExamCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      });
  },
});

export default examCategorySlice.reducer;
