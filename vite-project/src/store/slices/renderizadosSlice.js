import { createSlice } from "@reduxjs/toolkit";
const initialState = { 
    listaMultimedias: [], 
    listaTipos:[] 
};

const renderizadosSlice= createSlice({ 
    name: "renderizados", 
    initialState, 
    reducers: { 
        cargarMultimedia: (state, action) => { 
            console.log("action", action); 
            state.listaMultimedias= action.payload; 
        },
        cargarTipos: (state, action) => {
             console.log("action", action); 
             state.listaTipos= action.payload; 
        }
    }, 
});
export default renderizadosSlice.reducer;
export const {cargarMultimedia, cargarTipos}= renderizadosSlice.actions;