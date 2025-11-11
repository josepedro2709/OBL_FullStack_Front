import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaResenias: [],
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    cargarResenias: (state, action) => {
      console.log("action", action);
      state.listaResenias = action.payload;
    },
    crearResenia: (state, action) => {
      state.listaResenias.push(action.payload);
    },
    resetReviews: (state) => {
      state.listaResenias = [];
    },
  },
});

export const { cargarResenias, crearResenia, resetReviews } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
