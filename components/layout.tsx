import React from 'react';
import Header from "@/components/header";
import styles from "@/styles/Layout.module.scss"
import {raleway} from "@/pages/_app";
import {JSXElement} from "@/model";
import Footer from "@/components/footer";
import {useAppSelector} from "@/hook";

const Layout = ({children}:{children:JSXElement | JSXElement[]}) => {
    const theme = useAppSelector(state => state.theme.value)
    return (
        <>
            <Header />
            <main className={raleway.className} >
                <div className={styles.container}>
                    {children}
                </div>
            </main>
            <Footer/>
            {theme === 'dark' && <style jsx global>{`
                    body {
                      background: #202124;
                    }
              `}
            </style>}
        </>

    );
};

export default Layout;