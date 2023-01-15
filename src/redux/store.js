import {configureStore} from "@reduxjs/toolkit";
import pokemonsSLice from "./pokemons";

export const store = configureStore({
    reducer: {
        characters:pokemonsSLice
    },
})