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
    deleteResenia: (state, action) => {
      state.listaResenias = state.listaResenias.filter(
        (resenia) => resenia._id !== action.payload
      );
    },
    resetReviews: (state) => { state.listaResenias = [] },
  },
});

export const { cargarResenias, crearResenia, deleteResenia, resetReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;
