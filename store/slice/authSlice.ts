import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

interface AuthState {
    value: boolean
}


const initialState: AuthState = {
    value: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       setAuthState: (state, action:PayloadAction<boolean>)=>{ state.value = action.payload},

    },
})

export const { setAuthState } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth.value

export default authSlice.reducer