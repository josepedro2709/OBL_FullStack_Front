import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaResenias: [],
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    
    cargarResenias: (state, action) => {
      const data = action.payload;

      if (Array.isArray(data)) {
        state.listaResenias = data;
      } else if (data && typeof data === "object") {
        state.listaResenias = [data];
      } else {
        state.listaResenias = [];
      }
    },

    crearResenia: (state, action) => {
      if (!Array.isArray(state.listaResenias)) {
        state.listaResenias = [];
      }
      state.listaResenias.push(action.payload);
    },

    
    deleteResenia: (state, action) => {
      if (!Array.isArray(state.listaResenias)) return;
      state.listaResenias = state.listaResenias.filter(
        (resenia) => resenia._id !== action.payload
      );
    },
    editarResenia: (state, action) => {
      if (!Array.isArray(state.listaResenias)) return;

      const index = state.listaResenias.findIndex(
        (resenia) => resenia._id === action.payload._id
      );

      if (index !== -1) {
        state.listaResenias[index] = action.payload;
      }
    },
    resetReviews: (state) => {
      state.listaResenias = [];
    },
  },
});

export const {
  cargarResenias,
  crearResenia,
  deleteResenia,
  editarResenia,
  resetReviews,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
