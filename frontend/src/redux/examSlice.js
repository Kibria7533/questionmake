import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Async Thunks
export const fetchExams = createAsyncThunk("exam/fetchExams", async () => {
  const response = await fetch(`${BASE_URL}/exam`);
  const data = await response.json();
  return data;
});

export const addExam = createAsyncThunk("exam/addExam", async (newExam) => {
  const response = await fetch(`${BASE_URL}/exam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newExam),
  });
  const data = await response.json();
  return data;
});

export const updateExam = createAsyncThunk("exam/updateExam", async (updatedExam) => {
  const response = await fetch(`${BASE_URL}/exam/${updatedExam.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: updatedExam.name,
      exam_category_id: updatedExam.exam_category_id,
    }),
  });
  const data = await response.json();
  return data;
});

export const deleteExam = createAsyncThunk("exam/deleteExam", async (id) => {
  await fetch(`${BASE_URL}/exam/${id}`, { method: "DELETE" });
  return id;
});

// Slice
const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.exams.push(action.payload);
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.exams.findIndex((exam) => exam.id === action.payload.id);
        if (index !== -1) {
          state.exams[index] = action.payload;
        }
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.exams = state.exams.filter((exam) => exam.id !== action.payload);
      });
  },
});

export default examSlice.reducer;
