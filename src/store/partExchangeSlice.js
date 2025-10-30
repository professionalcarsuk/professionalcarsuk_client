import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for submitting part exchange form
export const submitPartExchangeForm = createAsyncThunk(
  "partExchange/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/client/part-exchange`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit part exchange form");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const partExchangeSlice = createSlice({
  name: "partExchange",
  initialState: {
    formData: {
      enquiry_regarding: "",
      first_name: "",
      last_name: "",
      telephone: "",
      postcode: "",
      email: "",
      registration: "",
      make: "",
      model: "",
      engine_size: "",
      external_colour: "",
      internal_colour: "",
      mileage: "",
      value: "",
      owners: "",
      first_registered: "",
      mot_expires: "",
      vehicle_condition: "",
      last_service: "",
      service_history: "",
      last_service_mileage: "",
      external_defects: "",
      internal_defects: "",
      comments: "",
      photos_url: "",
      captchaResponse: "",
    },
    currentStep: 1,
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
  },
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetForm: (state) => {
      state.formData = {
        enquiry_regarding: "",
        first_name: "",
        last_name: "",
        telephone: "",
        postcode: "",
        email: "",
        registration: "",
        make: "",
        model: "",
        engine_size: "",
        external_colour: "",
        internal_colour: "",
        mileage: "",
        value: "",
        owners: "",
        first_registered: "",
        mot_expires: "",
        vehicle_condition: "",
        last_service: "",
        service_history: "",
        last_service_mileage: "",
        external_defects: "",
        internal_defects: "",
        comments: "",
        photos_url: "",
        captchaResponse: "",
      };
      state.currentStep = 1;
      state.submitSuccess = false;
      state.submitError = null;
    },
    clearError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPartExchangeForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(submitPartExchangeForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        // Reset form after successful submission
        state.formData = {
          enquiry_regarding: "",
          first_name: "",
          last_name: "",
          telephone: "",
          postcode: "",
          email: "",
          registration: "",
          make: "",
          model: "",
          engine_size: "",
          external_colour: "",
          internal_colour: "",
          mileage: "",
          value: "",
          owners: "",
          first_registered: "",
          mot_expires: "",
          vehicle_condition: "",
          last_service: "",
          service_history: "",
          last_service_mileage: "",
          external_defects: "",
          internal_defects: "",
          comments: "",
          photos_url: "",
          captchaResponse: "",
        };
        state.currentStep = 1;
      })
      .addCase(submitPartExchangeForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload;
      });
  },
});

export const { updateFormField, setCurrentStep, resetForm, clearError } =
  partExchangeSlice.actions;
export default partExchangeSlice.reducer;
