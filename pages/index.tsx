import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import {GetStaticPaths, GetStaticProps} from 'next'
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import Aside from "@/components/aside";
import {getDate} from "@/utils";
import Link from "next/link";
import {IPost} from "@/model";

export const getStaticProps : GetStaticProps = async () => {
    const res = await  fetch('https://ug-mern-blog.onrender.com/posts')
    const {posts}:{posts:IPost[]} = await res.json()
    const postsReverse:IPost[] = posts.reverse()
    return {
        props: {posts:postsReverse},
        revalidate: 30,
    }
}

export default function Home({posts}:{posts:IPost[]}) {

  return (
    <>
        <Head>
        <title>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={styles.wrapper}>
            <div className={styles.wrapper_cards}>
                {posts.map((post)=>(
                    <div
                        key={post._id}
                        className={styles.card}
                    >
                        <div className={styles.wrapper_image}>
                            <Image
                                loader={() => `https://ug-mern-blog.onrender.com${post.imageUrl}` }
                                src={`https://ug-mern-blog.onrender.com${post.imageUrl}`}
                                alt={"#"}
                                unoptimized={true}
                                fill
                            />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.privat_info}>
                                <div className={styles.avatar}>
                                    <Image
                                        loader={() => `https://ug-mern-blog.onrender.com${post.author.avatarUrl}` }
                                        src={`https://ug-mern-blog.onrender.com${post.author.avatarUrl}`}
                                        alt={"#"}
                                        unoptimized={true}
                                        fill
                                    />
                                </div>
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
                                {post.tags.map((tag:string,index:number)=><span key={index}>#{tag}</span>)}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.aside_wrapper}>
                <Aside>
                    <h3>
                        Tags
                    </h3>
                    <ul>
                        <li>qweqwe</li>
                        <li>qweqwe</li>
                        <li>qweqwe</li>
                        <li>qweqwe</li>
                    </ul>
                </Aside>
                <Aside>
                    <h3>
                       Comments
                    </h3>
                    <ul>
                        <li>qweqwe</li>
                        <li>qweqwe</li>
                        <li>qweqwe</li>
                        <li>qweqwe</li>
                    </ul>
                </Aside>
            </div>
        </div>

    </>
  )
}
