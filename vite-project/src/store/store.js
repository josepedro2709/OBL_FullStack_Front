import { configureStore } from "@reduxjs/toolkit";
import reviewsSlice from "./slices/reviewsSlice";
import renderizadosSlice from "./slices/renderizadosSlice";

const store = configureStore({
  reducer: {
    reviews: reviewsSlice,
    renderizados: renderizadosSlice,
  },
});

export default store;