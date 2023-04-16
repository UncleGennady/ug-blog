import React from 'react';
import styles from "@/styles/Aside.module.scss"
import {JSXElement} from "@/model";
import {useAppSelector} from "@/hook";
const Aside = ({children}:{children:JSXElement | JSXElement[]}) => {
    const theme = useAppSelector(state => state.theme.value)
    return (
        <aside className={`${styles.aside} ${theme === 'dark' ? styles.aside_dark : ''}`}>
            {children}
        </aside>
    );
};

export default Aside;