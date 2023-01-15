import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk("pokemons/getPokemons",async (page) => {
    const res = await axios(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`)
    return res.data
})

export const pokemonsSLice = createSlice({
    name: "pokemons",
    initialState: {
        allItems: [],
        status: "idle",
        error: "",
        page: 1,
        pages: ""
    },
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: {
        [fetchPokemons.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchPokemons.fulfilled]: (state, action) => {
            console.log('action',action.payload.result)
            state.allItems = [...action.payload.results]
            state.pages = action.payload.count
            state.status = "succeeded"
        },
        [fetchPokemons.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
    }
})

export const {changePage} = pokemonsSLice.actions

export default pokemonsSLice.reducer