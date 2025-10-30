import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for submitting warranty form
export const submitWarrantyForm = createAsyncThunk(
  "warranty/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/client/warranty`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit warranty claim");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const warrantySlice = createSlice({
  name: "warranty",
  initialState: {
    formData: {
      date: "",
      full_name: "",
      email: "",
      telephone: "",
      reg: "",
      current_mileage: "",
      details_of_issue: "",
      date_first_noticed: "",
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
        date: "",
        full_name: "",
        email: "",
        telephone: "",
        reg: "",
        current_mileage: "",
        details_of_issue: "",
        date_first_noticed: "",
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
      .addCase(submitWarrantyForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(submitWarrantyForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        // Reset form after successful submission
        state.formData = {
          date: "",
          full_name: "",
          email: "",
          telephone: "",
          reg: "",
          current_mileage: "",
          details_of_issue: "",
          date_first_noticed: "",
          captchaResponse: "",
        };
      })
      .addCase(submitWarrantyForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload;
      });
  },
});

export const { updateFormField, resetForm, clearError } = warrantySlice.actions;
export default warrantySlice.reducer;
