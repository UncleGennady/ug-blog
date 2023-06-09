import React, {useState} from 'react';
import Head from 'next/head'
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import ReactMarkdown from "react-markdown";
import {IPost} from "@/model";
import styles from "@/styles/Post.module.scss"
import Image from "next/image";
import {getDate} from "@/utils";
import Comments from "@/components/comments";
import Card from "@/components/card";
import Avatar from "@/components/avatar";
import {useCreateCommentMutation, useDeleteCommentMutation, useGetCommentsQuery} from "@/store/commentApi";
import PostButton from "@/components/post-button";
import {useGetAuthMeQuery} from "@/store/authApi";
import {useRouter} from "next/router";
import {useAppSelector} from "@/hook";

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
export const getStaticProps: GetStaticProps<any> = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
    const { id }:any = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
    const { doc } = await res.json();

    if (!doc) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { post: doc },
        revalidate: 10,
    };
};

const Post = ({post}:{post:IPost}) => {
    const theme = useAppSelector(state => state.theme.value)
    const {data} = useGetAuthMeQuery()
    const [createComment] = useCreateCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()
    const {data:comments, isLoading, refetch} = useGetCommentsQuery(post._id)
    const [newComment, setNewComment] = useState('')
    const  router = useRouter()

    const renderImage = (image:any): any =>{
        if(!image) return null
        return (
            <div className={styles.wrapper_image}>
                <Image
                    loader={() => `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}` }
                    src={`${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`}
                    alt={"#"}
                    unoptimized={true}
                    fill
                />
            </div>
        )
    }

    const addCommentHandle = async ()=>{
        try{
            const res:any = await createComment({text:newComment, id: post._id})
            if(!!res.error){throw new Error(res.error.data.message)}
            refetch()
        }catch(error){
            alert(error)
            if(window.confirm("Do you want sign in?")){
                router.push('/login')
            }
        }
    }

    const deleteCommentHandle = (id:string)=> async() =>{
        // @ts-ignore
        await deleteComment(id)
        refetch()
    }

    // @ts-ignore
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Card>
                {!!data && data._id === post.author._id && <PostButton id={post._id}/>}
                {renderImage(post.imageUrl)}
                <h1 className={styles.title}>
                    {post.title}
                </h1>
                <div className={styles.info}>
                    <article className={styles.text}>
                        <ReactMarkdown children={post.text}/>
                    </article>
                    {!!post.tags[0] && <div className={styles.tags_card}>
                        {post.tags.map((tag:string,index:number)=><span key={index}>#{tag}</span>)}
                    </div>}
                    <div className={styles.statistics}>
                        <div className={styles.statistics_item}>
                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                                 aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveRedEyeOutlinedIcon" fill={ theme === 'dark' ? '#FFFBEB' : 'black'} width={18} height={18}>
                                <path
                                    d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"></path>
                            </svg>
                            <span>
                                    {post.viewsCount}
                                </span>
                        </div>
                        {!isLoading && comments.success && <div className={styles.statistics_item}>
                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                                 aria-hidden="true" viewBox="0 0 24 24" data-testid="ChatBubbleOutlineOutlinedIcon" fill={ theme === 'dark' ? '#FFFBEB' : 'black'} width={18} height={18}>
                                <path
                                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path>
                            </svg>
                            <span>
                                {comments.comments.length}
                            </span>
                        </div>}
                    </div>
                    <div className={styles.privat_info}>
                        <div className={styles.author}>
                            <h4>{post.author.fullName}</h4>
                            { !!post.author.avatarUrl &&  <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${post.author.avatarUrl}`} />}
                        </div>
                        <p>
                            {getDate(post.createdAt)}
                        </p>
                    </div>
                </div>
            </Card>
            {!isLoading && <Comments comments={comments.comments} addCommentHandle={addCommentHandle} deleteHandle={deleteCommentHandle} newComment={newComment} setNewComment={setNewComment} /> }
        </>
    );
};

    export default Post;