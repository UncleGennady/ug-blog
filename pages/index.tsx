import {useMemo, useState} from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import {GetStaticProps} from 'next'
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import Aside from "@/components/aside";
import {getDate, toggleForPostList} from "@/utils";
import Link from "next/link";
import {IPost, IComment, ISet} from "@/model";
import Avatar from "@/components/avatar";
import TagsList from "@/components/tags-list";
import CommentsList from "@/components/comments-list";
import PostButton from "@/components/post-button";
import {useGetAuthMeQuery} from "@/store/authApi";


export const getStaticProps : GetStaticProps = async () => {
    const res = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    const {posts}:{posts:IPost[]} = await res.json()
    const postsReverse:IPost[] = posts.reverse()

    const resLastComments = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`)

    const {comments}:{comments:IComment[]} = await resLastComments.json()
    // const comments:{success:boolean, comments:IComment[]} | {message:string} = await resLastComments.json()
    return {
        props: {posts:postsReverse, lastComments: comments},
        revalidate: 30,
    }
}



export default function Home({posts, lastComments}:{posts:IPost[], lastComments: IComment[]}) {
    const [toggle, setToggle] = useState<string>(toggleForPostList.new);
    const [currentTag, setCurrentTag] = useState<string | null >(null);
    const {data} = useGetAuthMeQuery()
    const toggleHandler = (value:string ) => () => setToggle(value)
    const getTags = ()=>{
        const value:ISet<string> = new Set
        const result: string[] = []
        posts.forEach((post:IPost)=>{
            if(value.size === 10 ) return value
            post.tags.forEach((tag:string)=>{
                if(value.size === 10) return value
                !!tag && value.add(tag)
            })
        })
        value.forEach((i:string)=> result.push(i))
        return result
    }
    const memoizedTags = useMemo(()=> getTags(), [posts])
    const filterPostsByPopularity = (posts:IPost[]): IPost[] => toggle === toggleForPostList.popular ? posts.slice().sort((a, b) => b.viewsCount - a.viewsCount) : posts;
    const filterPostsByTag = (posts:IPost[]):IPost[] => {
        if(!currentTag) return posts
        return posts.slice().filter(({tags})=>tags.includes(currentTag))
    }
    const renderPosts = (posts:IPost[]) =>{
        return (posts.map((post:IPost)=>(
            <div
                key={post._id}
                className={styles.card}
            >
                {!!data && data._id === post.author._id && <PostButton id={post._id}/>}
                {!!post.imageUrl && <div className={styles.wrapper_image}>
                    <Image
                    loader={() => `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}` }
                    src={`${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`}
                    alt={"#"}
                    unoptimized={true}
                    fill
                    />
                    </div>}
                <div className={styles.info}>
                    <div className={styles.privat_info}>
                        <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${post.author.avatarUrl}`}/>
                        <div>
                            <p>
                                {post.author.fullName}
                            </p>
                            <p>
                                {getDate(post.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className={styles.views}>
                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                             aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveRedEyeOutlinedIcon" width={18} height={18}>
                            <path
                                d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"></path>
                        </svg>
                        <span>
                                    {post.viewsCount}
                                </span>
                    </div>
                    <Link href={`/posts/${post._id}`}>
                        <h2>
                            {post.title}
                        </h2>
                    </Link>
                    <h4 className={styles.tags_card}>
                        {!!post.tags[0] && post.tags.map((tag:string,index:number)=><span key={index}>#{tag}</span>)}
                    </h4>
                </div>
            </div>
        )))
    }
    return (
    <>
        <Head>
        <title>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={styles.filters}>
            <div className={`${styles.toggle} ${toggle === toggleForPostList.new && styles.toggle_active}`}
                 onClick={toggleHandler(toggleForPostList.new)}>
                New
            </div>
            <div className={`${styles.toggle} ${toggle === toggleForPostList.popular && styles.toggle_active}`}
                 onClick={toggleHandler(toggleForPostList.popular)}>
                Popular
            </div>
            {currentTag &&
            <div className={styles.tag}>
                Current tag : <strong>#{currentTag}</strong>
                <button onClick={()=>setCurrentTag(null)}>
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                         aria-hidden="true" viewBox="0 0 24 24" data-testid="ClearIcon">
                        <path
                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
            </div>}
        </div>
        <div className={styles.wrapper}>
            <div className={styles.wrapper_cards}>
                {renderPosts(filterPostsByPopularity(filterPostsByTag(posts)))}
            </div>
            <div className={styles.aside_wrapper}>
                <TagsList tags={memoizedTags} setCurrentTag={setCurrentTag}/>
                <CommentsList comments={lastComments}/>
            </div>
        </div>

    </>
    )
}
