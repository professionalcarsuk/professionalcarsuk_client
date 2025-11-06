import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

// Fetch recent vehicles public endpoint (uses client API)
export const fetchRecentVehicles = createAsyncThunk(
  'vehicles/fetchRecent',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/client/vehicles/recent?page=1&pageSize=200`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch vehicles');
      return data.data || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch vehicles for Part Exchange dropdown
export const fetchPartExchangeVehicles = createAsyncThunk(
  'vehicles/fetchPartExchange',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/client/part-exchange-vehicles`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch vehicles');
      return data.data || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch individual vehicle by ID
export const fetchVehicleById = createAsyncThunk(
  'vehicles/fetchById',
  async (vehicleId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/client/vehicles/${vehicleId}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch vehicle');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    items: [],
    partExchangeItems: [],
    currentVehicle: null,
    favorites: [],
    status: 'idle',
    partExchangeStatus: 'idle',
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const vehicle = action.payload;
      const exists = state.favorites.some((fav) => fav.id === vehicle.id);
      if (!exists) {
        state.favorites.push(vehicle);
        // Save to localStorage
        try {
          localStorage.setItem('vehicle_favorites', JSON.stringify(state.favorites));
        } catch (error) {
          console.error('Error saving favorites to localStorage:', error);
        }
      }
    },
    removeFromFavorites: (state, action) => {
      const vehicleId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== vehicleId);
      // Save to localStorage
      try {
        localStorage.setItem('vehicle_favorites', JSON.stringify(state.favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    },
    loadFavorites: (state) => {
      try {
        const storedFavorites = localStorage.getItem('vehicle_favorites');
        if (storedFavorites) {
          state.favorites = JSON.parse(storedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
      try {
        localStorage.removeItem('vehicle_favorites');
      } catch (error) {
        console.error('Error clearing favorites from localStorage:', error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentVehicles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecentVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecentVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchPartExchangeVehicles.pending, (state) => {
        state.partExchangeStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPartExchangeVehicles.fulfilled, (state, action) => {
        state.partExchangeStatus = 'succeeded';
        state.partExchangeItems = action.payload;
      })
      .addCase(fetchPartExchangeVehicles.rejected, (state, action) => {
        state.partExchangeStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVehicle = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectVehicleItems = (state) => state.vehicles.items || [];

// Memoized selectors for brands
export const selectUniqueBrands = createSelector([selectVehicleItems], (items) => {
  const seen = new Set();
  const brands = [];
  for (const v of items) {
    const name = (v.brand || '').toString();
    if (!name) continue;
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      brands.push(name);
    }
  }
  return brands.sort((a, b) => a.localeCompare(b));
});

export const selectVanBrands = createSelector([selectVehicleItems], (items) => {
  const seen = new Set();
  const brands = [];
  for (const v of items) {
    const body = (v.bodyStyle || v.bodyType || '').toString().toLowerCase();
    if (!body) continue;
    if (body.includes('van') || body.includes('panel') || body.includes('box')) {
      const name = (v.brand || '').toString();
      if (!name) continue;
      const key = name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        brands.push(name);
      }
    }
  }
  return brands.sort((a, b) => a.localeCompare(b));
});

export const selectCurrentVehicle = (state) => state.vehicles.currentVehicle;

export const selectFavorites = (state) => state.vehicles.favorites || [];
export const selectFavoritesCount = (state) => (state.vehicles.favorites || []).length;

// Memoized selector for checking if a vehicle is favorited
export const selectIsFavorite = createSelector(
  [selectFavorites, (state, vehicleId) => vehicleId],
  (favorites, vehicleId) => favorites.some((fav) => fav.id === vehicleId)
);

export const { addToFavorites, removeFromFavorites, loadFavorites, clearFavorites } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;
