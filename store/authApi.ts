import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAuthMeResponse, ISignIn, ISignInResponse, ISignUp, ISignUpResponse} from "@/model";

// @ts-ignore
// @ts-ignore
// @ts-ignore
export const authApi = createApi({
    reducerPath: 'authApi',
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

        getAuthMe: build.query <IAuthMeResponse,void>({
            query:() => ({
                url: `/auth/me`,
            }),
        }),

        fetchAuth: build.mutation<ISignInResponse, ISignIn >({
            query:(params) => ({
                url: `/auth/login`,
                method: 'POST',
                body: params
            }),
        }),

        fetchRegister: build.mutation<ISignUpResponse, ISignUp>({
            query:(params) => ({
                url:`/auth/register`,
                method:'POST',
                body: params
            })
        }),
        fetchAvatar: build.mutation<any, any>({
            query:(params)=>({
                url:`/avatar`,
                method:'POST',
                body:params
            })
        }),
        deleteAvatar: build.mutation<any, any>({
            query:(params)=>({
                url:`/avatar`,
                method:'DELETE',
                body:params
            })
        }),


    })
})


export const { useGetAuthMeQuery , useFetchAuthMutation, useFetchRegisterMutation, useFetchAvatarMutation, useDeleteAvatarMutation } = authApi