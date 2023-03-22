import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    IComment,
    ICreatedComment,
    ICreatedCommentResponse,
    IDeleteRequest,
    IDeleteResponse
} from "@/model";

type TComments = {success: boolean, comments:IComment[]} | {message:string};

export const commentApi = createApi({
    reducerPath: 'commentApi',
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
        getComments: build.query<TComments | any, string>({
            query:(postId) => ({
                url:`/comments/${postId}`
            })
        }),
        createComment: build.mutation<ICreatedCommentResponse, ICreatedComment >({
            query:(params) => ({
                url: `/comments`,
                method: 'POST',
                body: params
            }),
        }),
        deleteComment: build.mutation<IDeleteResponse, IDeleteRequest >({
            query:(id) => ({
                url: `/comments/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation } = commentApi