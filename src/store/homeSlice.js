import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    generes: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.generes = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
