import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICreatedPost, ICreatedPostResponse} from "@/model";
import {authApi} from "@/store/authApi";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = !!(window.localStorage.getItem('token')) ? window.localStorage.getItem('token') : ''
            if (!!token) {
                headers.set('authorization', `${token}`)
            }
        }
    }),
    endpoints: (build)=> ({
        createPost: build.mutation<ICreatedPostResponse, ICreatedPost >({
            query:(params) => ({
                url: `/post`,
                method: 'POST',
                body: params
            }),
        }),
    })
})

export const {useCreatePostMutation } = postApi