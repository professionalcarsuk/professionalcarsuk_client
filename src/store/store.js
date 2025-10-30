import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import sellCarReducer from "./sellCarSlice";
import warrantyReducer from "./warrantySlice";
import partExchangeReducer from "./partExchangeSlice";
import vehicleReducer from "./vehicleSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    sellCar: sellCarReducer,
    warranty: warrantyReducer,
    partExchange: partExchangeReducer,
    vehicles: vehicleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
