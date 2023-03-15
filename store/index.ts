import { configureStore } from '@reduxjs/toolkit'
import {authApi} from "@/store/authApi";
import {postApi} from "@/store/postApi";
import {commentApi} from "@/store/commentApi";
import authReducer from "@/store/slice/authSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(postApi.middleware).concat(commentApi.middleware) ,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch