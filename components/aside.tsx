import React from 'react';
import styles from "@/styles/Aside.module.scss"
type Props = {
    children: JSX.Element[]
}
const Aside = ({children}: Props) => {
    return (
        <aside className={`${styles.aside}`}>
            {children}
        </aside>
    );
};

export default Aside;