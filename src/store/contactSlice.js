import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  "contact/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/client/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    formData: {
      name: "",
      subject: "",
      telephone: "",
      email: "",
      question: "",
      captchaResponse: "",
      // Delivery-specific fields
      address_line1: "",
      address_line2: "",
      postcode: "",
      preferred_delivery_datetime: "",
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
        name: "",
        subject: "",
        telephone: "",
        email: "",
        question: "",
        captchaResponse: "",
        // Delivery-specific fields
        address_line1: "",
        address_line2: "",
        postcode: "",
        preferred_delivery_datetime: "",
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
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        // Reset form after successful submission
        state.formData = {
          name: "",
          subject: "",
          telephone: "",
          email: "",
          question: "",
          captchaResponse: "",
          // Delivery-specific fields
          address_line1: "",
          address_line2: "",
          postcode: "",
          preferred_delivery_datetime: "",
        };
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload;
      });
  },
});

export const { updateFormField, resetForm, clearError } = contactSlice.actions;
export default contactSlice.reducer;
