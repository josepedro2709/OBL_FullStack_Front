import { configureStore } from "@reduxjs/toolkit";
import reviewsSlice from "./slices/reviewsSlice";
import renderizadosSlice from "./slices/renderizadosSlice";
import usuarioSlice from "./slices/usuarioSlice";

const store = configureStore({
  reducer: {
    reviews: reviewsSlice,
    renderizados: renderizadosSlice,
    usuario: usuarioSlice,
  },
});

export default store;