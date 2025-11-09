import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: null,
};

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    cargarUsuario: (state, action) => {
      state.usuario = action.payload;
    },
    resetUsuario: (state) => { state.usuario = null },
  },
});

export const {cargarUsuario,resetUsuario } = usuarioSlice.actions;

export default usuarioSlice.reducer;