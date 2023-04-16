import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import {theme} from "@/model";


interface AuthState {
    value: theme
}


const initialState: AuthState = {
    value: "light"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeState: (state, action:PayloadAction<theme>)=>{ state.value = action.payload},

    },
})

export const { setThemeState } = themeSlice.actions

export const selectAuth = (state: RootState) => state.auth.value

export default themeSlice.reducer