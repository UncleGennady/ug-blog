import React from 'react';
import Header from "@/components/header";
import styles from "@/styles/Layout.module.scss"
import {raleway} from "@/pages/_app";
import {JSXElement} from "@/model";
import Footer from "@/components/footer";

const Layout = ({children}:{children:JSXElement | JSXElement[]}) => {
    return (
        <>
            <Header />
            <main className={raleway.className} >
                <div className={styles.container}>
                    {children}
                </div>
            </main>
            <Footer/>
        </>

    );
};

export default Layout;