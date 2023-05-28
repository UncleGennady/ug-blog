import React from 'react';
import styles from "@/styles/Card.module.scss"
import {JSXElement} from "@/model";
import {useAppSelector} from "@/hook";
import {motion} from "framer-motion";

const Card = ({children}:{children:JSXElement | JSXElement[]}) => {
    const theme = useAppSelector(state => state.theme.value)
    const divVariants= {
        visible:{opacity: 1,x:0, transition:{duration: 0.4}},
        hidden: {opacity: 0,x:-500},
    };
    return (
        <motion.div variants={divVariants} initial='hidden' animate='visible' className={`${styles.card} ${theme==='dark' ? styles.card_dark : ''}`}>
            {children}
        </motion.div>
    );
};

export default Card;