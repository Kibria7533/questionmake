import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/classes`;

// Async Thunks
export const fetchClasses = createAsyncThunk("class/fetchClasses", async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
});

export const addClass = createAsyncThunk("class/addClass", async (newClass) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newClass }),
  });
  const data = await response.json();
  return data;
});

export const updateClass = createAsyncThunk("class/updateClass", async (updatedClass) => {
  const response = await fetch(`${BASE_URL}/${updatedClass.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: updatedClass.name }),
  });
  const data = await response.json();
  return data;
});

export const deleteClass = createAsyncThunk("class/deleteClass", async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return id;
});

// Slice
const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex((cls) => cls.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter((cls) => cls.id !== action.payload);
      });
  },
});

export default classSlice.reducer;
