import React, {useEffect, useState} from 'react';
import {GetStaticPaths, GetStaticProps} from "next";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {IUpdatedPostResponse, IPost, ICreatedPost} from "@/model";
import {useRouter} from "next/router";
import {useAppSelector} from "@/hook";
import Head from "next/head";
import styles from "@/styles/AddPost.module.scss";
import PostForm from "@/components/post-form";
import {useGetAuthMeQuery} from "@/store/authApi";
import {useUpdatePostMutation} from "@/store/postApi";

export const getStaticPaths : GetStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    const {posts} = await res.json()

    const paths = posts.map((post: IPost) => ({
            params: {
                id: post._id.toString()
            }
        })
    )

    return {paths, fallback: 'blocking'}
}
export const getStaticProps : GetStaticProps = async (context) => {
    const {id}:any = context.params
    const res = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
    const {doc} = await res.json()

    return {
        props: {post:doc},
        revalidate: 10,
    }
}


const Edit = ({post}:{post:IPost}) => {
    const [textMarkdown, setTextMarkdown] = useState(post.text);
    const {data} = useGetAuthMeQuery();
    const [updatePost, result] = useUpdatePostMutation()
    const  router = useRouter()
    const auth = useAppSelector((state) => state.auth.value)
    useEffect(()=>{
        if(!auth)router.push('/login')
        if(!!data &&  data._id !== post.author._id) router.push('/')
    },[auth, data])
    const submitHandle = async (values: ICreatedPost) =>{
        if(window.confirm("Update post?")){
            const {data}:{data:IUpdatedPostResponse} | any = await updatePost({...values, id:post._id})
            !!data.success && router.push(`/`)
        }
    }
    return (
        <>
            <Head>
                <title>Add post</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <PostForm title={post.title} img={post.imageUrl} tags={post.tags} textMarkdown={textMarkdown} setTextMarkdown={setTextMarkdown} submitHandle={submitHandle}/>
            </main>

        </>
    );
};

    export default Edit