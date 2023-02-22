import React from 'react';
import styles from "@/styles/Aside.module.scss"
import {JSXElement} from "@/model";
const Aside = ({children}:{children:JSXElement | JSXElement[]}) => {
    return (
        <aside className={`${styles.aside}`}>
            {children}
        </aside>
    );
};

export default Aside;