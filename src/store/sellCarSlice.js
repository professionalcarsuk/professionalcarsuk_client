import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for submitting sell car form
export const submitSellCarForm = createAsyncThunk(
  "sellCar/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/client/sell-car`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit sell car form");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const sellCarSlice = createSlice({
  name: "sellCar",
  initialState: {
    formData: {
      registration: "",
      make: "",
      model: "",
      year: "",
      mileage: "",
      name: "",
      email: "",
      telephone: "",
      captchaResponse: "",
    },
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
  },
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetForm: (state) => {
      state.formData = {
        registration: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        name: "",
        email: "",
        telephone: "",
        captchaResponse: "",
      };
      state.submitSuccess = false;
      state.submitError = null;
    },
    clearError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSellCarForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(submitSellCarForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
      })
      .addCase(submitSellCarForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload;
      });
  },
});

export const { updateFormField, resetForm, clearError } = sellCarSlice.actions;
export default sellCarSlice.reducer;
