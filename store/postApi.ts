import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICreatedPost, ICreatedPostResponse, IUpdatedPost, IUpdatedPostResponse,IDeletePost, IDeletePostResponse,} from "@/model";
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
                url: `/posts`,
                method: 'POST',
                body: params
            }),
        }),
        updatePost: build.mutation<IUpdatedPostResponse, IUpdatedPost >({
            query:({title ,tags, text, imageUrl, id}) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: {title, text, tags, imageUrl}
            })
        }),
        deletePost: build.mutation<IDeletePostResponse, IDeletePost >({
            query:(id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postApi