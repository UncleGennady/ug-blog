import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import styles from "@/styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import {raleway} from "@/pages/_app";
import {useGetAuthMeQuery} from "@/store/authApi";
import { useAppSelector, useAppDispatch } from '@/hook'
import {setAuthState} from "@/store/slice/authSlice";
import {setThemeState} from "@/store/slice/themeSlice";
import {theme} from "@/model";
import Burger from "@/components/burger";


const navigationPage = [
    {id:1, title: "Home", path:'/'},
    {id:2, title: "About us", path:'/about'},
]
const navigationRegister = [
    {id:1, title: "Sign in", path:'/login'},
    {id:2, title: "Sign up", path:'/register'},
]
const themeKey = 'theme'

const Header = () => {
    const {pathname,} = useRouter();
    const router = useRouter()
    const {data} = useGetAuthMeQuery()
    const auth = useAppSelector((state) => state.auth.value)
    const theme = useAppSelector((state) => state.theme.value)
    const [isClicked, setIsClicked] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
         if(!!data) dispatch(setAuthState(true))
    }, [data])

    useEffect(()=>{
        const theme: any = window.localStorage.getItem(themeKey);
        if(!!theme) dispatch(setThemeState(theme));
    },[])

    console.log(data)

    const onClickLogout = () => {
        if(window.confirm("Do you really want to leave ?")){
            window.localStorage.removeItem('token')
            dispatch(setAuthState(false))
            router.push('/')
        }
    };
    const changeTheme = (theme: theme)=> () => {
        window.localStorage.setItem('theme', theme)
        dispatch(setThemeState(theme))
    }
    const updateBurgerMenu = () => {
        setIsClicked(!isClicked)
    }

    return (
        <header className={`${styles.header} ${theme==='dark' ? styles.header_dark : ''} ${raleway.className} `}>
            <nav className={styles.nav}>
               <Link href={'/'} className={styles.logo_wrapper}>
                   <div className={styles.logo}>
                       <Image
                           src="/ug_logo.svg"
                           alt="Picture of the author"
                           fill
                           placeholder= "blur"
                           blurDataURL={'/ug_logo.svg'}
                       />
                   </div>
               </Link>
                <ul className={styles.ul}>
                    {theme==="light" && <li className={styles.theme}>
                       <button onClick={changeTheme('dark')}>
                           <svg width="32" height="32" version="1.0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                               <g transform="translate(0 512) scale(.1 -.1)">
                                   <path d="m2105 4954c-419-57-770-228-1085-530-191-184-332-379-455-629-116-235-186-470-227-760-19-138-16-524 5-665 71-457 233-842 495-1175 71-90 267-286 357-357 340-268 742-434 1210-500 118-16 512-16 635 1 159 21 328 60 470 107 156 52 395 166 525 251 265 174 507 420 665 678 154 250 253 568 254 817 1 92-2 110-20 134-38 52-71 69-132 69-51 0-66-5-145-53-178-109-404-198-617-244-141-30-475-33-615-5-681 135-1206 661-1331 1332-29 152-26 472 5 615 45 213 134 439 243 617 48 79 53 94 53 145 0 61-17 94-69 132-22 17-44 21-109 22-45 1-95 0-112-2zm-184-416c-73-162-140-412-162-608-14-128-7-423 14-535 81-433 281-807 586-1098 291-277 629-448 1036-524 112-21 407-28 535-14 196 23 449 90 607 161l63 29-6-27c-30-125-141-351-242-492-87-123-261-298-389-393-465-344-1084-473-1691-351-574 114-1056 454-1347 948-276 470-357 1090-214 1646 136 529 491 981 947 1209 84 42 258 110 284 111 4 0-6-28-21-62z"/>
                               </g>
                           </svg>
                       </button>
                    </li>}
                    {theme==="dark" && <li className={styles.theme}>
                        <button onClick={changeTheme('light')}>
                            <svg width="32" height="32" version="1.0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 512) scale(.1 -.1)">
                                    <path d="m2486 5105c-50-18-102-68-121-120-13-34-15-85-13-311 3-266 3-271 27-305 39-58 97-92 162-97 73-5 115 9 163 56 64 62 66 71 66 364 0 296-4 314-73 375-58 51-135 65-211 38z"/>
                                    <path d="m833 4424c-32-7-108-78-127-118-9-19-16-54-16-78 0-94 11-110 198-300 192-195 232-223 317-222 174 3 267 193 165 338-34 48-310 323-358 356-33 22-128 35-179 24z"/>
                                    <path d="m4140 4419c-48-15-392-357-416-414-71-170 81-341 256-289 49 15 70 32 213 173 87 86 175 178 195 206 35 47 37 54 37 125 0 68-3 80-28 113-50 66-90 89-159 93-35 2-79-1-98-7z"/>
                                    <path d="m2365 3824c-562-94-985-524-1070-1084-61-398 82-811 379-1097 499-483 1273-483 1772 0 393 379 503 958 274 1453-122 265-346 490-614 619-225 108-506 149-741 109zm410-438c81-22 215-87 289-140 214-153 346-415 346-686 0-393-253-719-640-826-92-26-328-26-420 0-283 78-498 274-593 541-37 103-51 208-45 338 18 377 298 701 678 782 85 19 303 13 385-9z"/>
                                    <path d="m125 2751c-130-61-165-222-72-328 61-69 79-73 375-73 292 0 302 2 364 65 46 47 61 91 56 164-5 67-33 114-92 157l-41 29-275 3c-252 2-278 1-315-17z"/>
                                    <path d="m4415 2763c-34-9-86-50-113-90-23-33-27-48-27-114 0-87 18-124 89-174l41-30 270-3c306-3 328 0 389 68 98 109 60 278-76 334-31 13-83 16-295 15-142-1-267-4-278-6z"/>
                                    <path d="m1135 1404c-44-14-72-38-231-197-108-109-188-198-198-221-25-53-18-148 14-197 38-58 95-92 161-97 98-7 117 5 301 186 92 90 178 180 192 200 117 171-42 387-239 326z"/>
                                    <path d="m3875 1411c-83-21-146-81-165-159-10-43-9-60 5-109 16-55 27-68 199-240 113-113 196-188 219-198 71-29 169-15 222 32 69 62 95 171 59 249-10 23-90 112-198 220-166 167-185 183-235 198-59 17-61 17-106 7z"/>
                                    <path d="m2495 843c-35-10-86-50-113-90l-27-38-3-265c-4-292 0-319 51-377 85-96 229-96 314 0 51 58 55 85 51 377-3 261-3 266-27 301-41 61-94 91-164 95-34 1-71 0-82-3z"/>
                                </g>
                            </svg>
                        </button>
                    </li>}
                    {navigationPage.map(page=>(
                        <li key={page.id}>
                            <Link href={page.path} className={`${styles.link} ${pathname === page.path ? styles["link-active"] : ''} `}>
                                {page.title}
                            </Link>
                        </li>
                        )
                    )}
                    {!auth && navigationRegister.map(page=>(
                            <li key={page.id}>
                                <Link href={page.path} className={`${styles.button} ${pathname === page.path ? styles["link-active"] : ''} ${theme==='dark' ? styles.button_dark : ''}`}>
                                    {page.title}
                                </Link>
                            </li>
                        )
                    )}
                    {auth &&
                            <>
                                <li>
                                    <Link href={'/add-post'} className={`${styles.button} ${theme==='dark' ? styles.button_dark : ''}`}>
                                        Add post
                                    </Link>
                                </li>
                                <li>
                                    <button className={`${styles.button} ${theme==='dark' ? styles.button_dark : ''}`} onClick={onClickLogout}>
                                    Log out
                                    </button>
                                </li>
                            </>
                    }
                </ul>
                <Burger isClicked={isClicked} updateMenu={updateBurgerMenu}>
                    {theme==="light" && <li className={styles.theme}>
                        <button
                            onClick={()=>{
                                changeTheme('dark')()
                                updateBurgerMenu()
                            }
                        }>
                            <svg width="32" height="32" version="1.0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 512) scale(.1 -.1)">
                                    <path d="m2105 4954c-419-57-770-228-1085-530-191-184-332-379-455-629-116-235-186-470-227-760-19-138-16-524 5-665 71-457 233-842 495-1175 71-90 267-286 357-357 340-268 742-434 1210-500 118-16 512-16 635 1 159 21 328 60 470 107 156 52 395 166 525 251 265 174 507 420 665 678 154 250 253 568 254 817 1 92-2 110-20 134-38 52-71 69-132 69-51 0-66-5-145-53-178-109-404-198-617-244-141-30-475-33-615-5-681 135-1206 661-1331 1332-29 152-26 472 5 615 45 213 134 439 243 617 48 79 53 94 53 145 0 61-17 94-69 132-22 17-44 21-109 22-45 1-95 0-112-2zm-184-416c-73-162-140-412-162-608-14-128-7-423 14-535 81-433 281-807 586-1098 291-277 629-448 1036-524 112-21 407-28 535-14 196 23 449 90 607 161l63 29-6-27c-30-125-141-351-242-492-87-123-261-298-389-393-465-344-1084-473-1691-351-574 114-1056 454-1347 948-276 470-357 1090-214 1646 136 529 491 981 947 1209 84 42 258 110 284 111 4 0-6-28-21-62z"/>
                                </g>
                            </svg>
                        </button>
                    </li>}
                    {theme==="dark" && <li className={styles.theme}>
                        <button onClick={()=>{
                            changeTheme('light')()
                            updateBurgerMenu()
                        }
                        }>
                            <svg width="32" height="32" version="1.0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 512) scale(.1 -.1)">
                                    <path d="m2486 5105c-50-18-102-68-121-120-13-34-15-85-13-311 3-266 3-271 27-305 39-58 97-92 162-97 73-5 115 9 163 56 64 62 66 71 66 364 0 296-4 314-73 375-58 51-135 65-211 38z"/>
                                    <path d="m833 4424c-32-7-108-78-127-118-9-19-16-54-16-78 0-94 11-110 198-300 192-195 232-223 317-222 174 3 267 193 165 338-34 48-310 323-358 356-33 22-128 35-179 24z"/>
                                    <path d="m4140 4419c-48-15-392-357-416-414-71-170 81-341 256-289 49 15 70 32 213 173 87 86 175 178 195 206 35 47 37 54 37 125 0 68-3 80-28 113-50 66-90 89-159 93-35 2-79-1-98-7z"/>
                                    <path d="m2365 3824c-562-94-985-524-1070-1084-61-398 82-811 379-1097 499-483 1273-483 1772 0 393 379 503 958 274 1453-122 265-346 490-614 619-225 108-506 149-741 109zm410-438c81-22 215-87 289-140 214-153 346-415 346-686 0-393-253-719-640-826-92-26-328-26-420 0-283 78-498 274-593 541-37 103-51 208-45 338 18 377 298 701 678 782 85 19 303 13 385-9z"/>
                                    <path d="m125 2751c-130-61-165-222-72-328 61-69 79-73 375-73 292 0 302 2 364 65 46 47 61 91 56 164-5 67-33 114-92 157l-41 29-275 3c-252 2-278 1-315-17z"/>
                                    <path d="m4415 2763c-34-9-86-50-113-90-23-33-27-48-27-114 0-87 18-124 89-174l41-30 270-3c306-3 328 0 389 68 98 109 60 278-76 334-31 13-83 16-295 15-142-1-267-4-278-6z"/>
                                    <path d="m1135 1404c-44-14-72-38-231-197-108-109-188-198-198-221-25-53-18-148 14-197 38-58 95-92 161-97 98-7 117 5 301 186 92 90 178 180 192 200 117 171-42 387-239 326z"/>
                                    <path d="m3875 1411c-83-21-146-81-165-159-10-43-9-60 5-109 16-55 27-68 199-240 113-113 196-188 219-198 71-29 169-15 222 32 69 62 95 171 59 249-10 23-90 112-198 220-166 167-185 183-235 198-59 17-61 17-106 7z"/>
                                    <path d="m2495 843c-35-10-86-50-113-90l-27-38-3-265c-4-292 0-319 51-377 85-96 229-96 314 0 51 58 55 85 51 377-3 261-3 266-27 301-41 61-94 91-164 95-34 1-71 0-82-3z"/>
                                </g>
                            </svg>
                        </button>
                    </li>}
                    {navigationPage.map(page=>(
                            <li key={page.id}>
                                    <Link href={page.path} onClick={updateBurgerMenu} className={`${pathname === page.path ? styles["link-active"] : ''}`}>
                                    {page.title}
                                </Link>
                            </li>
                        )
                    )}
                    {!auth && navigationRegister.map(page=>(
                            <li key={page.id}>
                                <Link href={page.path} onClick={updateBurgerMenu} className={`${pathname === page.path ? styles["link-active"] : ''}`}>
                                    {page.title}
                                </Link>
                            </li>
                        )
                    )}
                    {auth &&
                    <>
                        <li>
                            <Link href={'/add-post'} onClick={updateBurgerMenu} className={`${styles.burger_button} ${theme==='dark' ? styles.burger_button_dark : ''}`}>
                                Add post
                            </Link>
                        </li>
                        <li>
                            <button className={`${styles.burger_button} ${theme==='dark' ? styles.burger_button_dark : ''}`}
                                    onClick={()=>{
                                        onClickLogout()
                                        updateBurgerMenu()
                                        }
                                    }
                            >
                                Log out
                            </button>
                        </li>
                    </>
                    }

                </Burger>
            </nav>
        </header>
    );
};

export default Header;