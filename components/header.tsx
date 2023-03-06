import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import styles from "@/styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import {raleway} from "@/pages/_app";
import {useGetAuthMeQuery} from "@/store/authApi";
import { useAppSelector, useAppDispatch } from '@/hook'
import {setAuthState} from "@/store/slice/authSlice";


const navigationPage = [
    {id:1, title: "Home", path:'/'},
    {id:2, title: "About us", path:'/about'},
]
const navigationRegister = [
    {id:1, title: "Sign in", path:'/login'},
    {id:2, title: "Sign up", path:'/register'},
]

const Header = () => {
    const {pathname} = useRouter();
    const {data} = useGetAuthMeQuery()
    const auth = useAppSelector((state) => state.auth.value)
    const dispatch = useAppDispatch()
    useEffect(() => {
         if(!!data) dispatch(setAuthState(true))
    }, [data])

    console.log(data)

    const onClickLogout = () => {
        if(window.confirm("Do you really want to leave ?")){
            window.localStorage.removeItem('token')
            dispatch(setAuthState(false))
        }
    };

    return (
        <header className={`${styles.header} ${raleway.className} `}>
            <nav className={styles.nav}>
               <Link href={'/'} className={styles.logo}>
                   <Image
                       src="/ug_logo.svg"
                       alt="Picture of the author"
                       width={50}
                       height={50}
                       placeholder= "blurDataURL"
                   />
               </Link>
                <ul className={styles.ul}>
                    {navigationPage.map(page=>(
                        <li key={page.id}>
                            <Link href={page.path} className={`${styles.link} ${pathname === page.path ? styles["link-active"] : null} `}>
                                {page.title}
                            </Link>
                        </li>
                        )
                    )}
                    {!auth && navigationRegister.map(page=>(
                            <li key={page.id}>
                                <Link href={page.path} className={`${styles.button} ${pathname === page.path ? styles["link-active"] : null}`}>
                                    {page.title}
                                </Link>
                            </li>
                        )
                    )}
                    {auth &&
                            <>
                                <li>
                                    <Link href={'/add-post'} className={`${styles.button}`}>
                                        Add post
                                    </Link>
                                </li>
                                <li>
                                    <button className={`${styles.button}`} onClick={onClickLogout}>
                                    Log out
                                    </button>
                                </li>
                            </>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;