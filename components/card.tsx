import React from 'react';
import styles from "@/styles/Card.module.scss"
import {JSXElement} from "@/model";
const Card = ({children}:{children:JSXElement | JSXElement[]}) => {
    return (
        <div className={styles.card}>
            {children}
        </div>
    );
};

export default Card;