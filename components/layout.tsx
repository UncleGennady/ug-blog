import React from 'react';
import Header from "@/components/header";
import styles from "@/styles/Layout.module.scss"
import {raleway} from "@/pages/_app";

type Props = {
    children: JSX.Element
}
const Layout = ({children}: Props) => {
    return (
        <>
            <Header />
            <main className={raleway.className} >
                <div className={styles.container}>
                    {children}
                </div>
            </main>
            <footer className={styles.footer}>

            </footer>
        </>

    );
};

export default Layout;