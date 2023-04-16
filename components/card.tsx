import React from 'react';
import styles from "@/styles/Card.module.scss"
import {JSXElement} from "@/model";
import {useAppSelector} from "@/hook";
const Card = ({children}:{children:JSXElement | JSXElement[]}) => {
    const theme = useAppSelector(state => state.theme.value)
    return (
        <div className={`${styles.card} ${theme==='dark' ? styles.card_dark : ''}`}>
            {children}
        </div>
    );
};

export default Card;