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
  async (formData) => {
    const response = await fetch(`${BASE_URL}/exam-category`, {
      method: "POST",
      body: formData, // FormData includes all fields and the logo file
    });
    const data = await response.json();
    return data;
  }
);

export const updateExamCategory = createAsyncThunk(
  "examCategory/updateExamCategory",
  async (formData) => {
    const id = formData.get("id");
    const response = await fetch(`${BASE_URL}/exam-category/${id}`, {
      method: "PUT",
      body: formData, // FormData includes updated fields and the logo file
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
