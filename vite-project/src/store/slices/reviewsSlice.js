import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaResenias: [],
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    // ✅ Cargar reseñas asegurando que siempre sea array
    cargarResenias: (state, action) => {
      const data = action.payload;

      // 🔹 Si el payload no es array, lo normalizamos
      if (Array.isArray(data)) {
        state.listaResenias = data;
      } else if (data && typeof data === "object") {
        state.listaResenias = [data];
      } else {
        state.listaResenias = [];
      }
    },

    // ✅ Crear reseña nueva sin riesgo de tipo
    crearResenia: (state, action) => {
      if (!Array.isArray(state.listaResenias)) {
        state.listaResenias = [];
      }
      state.listaResenias.push(action.payload);
    },

    // ✅ Eliminar reseña
    deleteResenia: (state, action) => {
      if (!Array.isArray(state.listaResenias)) return;
      state.listaResenias = state.listaResenias.filter(
        (resenia) => resenia._id !== action.payload
      );
    },

    // ✅ Reset general
    resetReviews: (state) => {
      state.listaResenias = [];
    },
  },
});

export const { cargarResenias, crearResenia, deleteResenia, resetReviews } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
