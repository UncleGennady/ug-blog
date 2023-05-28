import React from 'react';
import styles from "@/styles/Aside.module.scss"
import {JSXElement} from "@/model";
import {useAppSelector} from "@/hook";
import {motion} from "framer-motion";
const Aside = ({children}:{children:JSXElement | JSXElement[]}) => {
    const theme = useAppSelector(state => state.theme.value)
    const asideVariants= {
        visible:{opacity: 1,x:0, transition:{duration: 0.4, delay: 0.2}},
        hidden: {opacity: 0,x:1000},
    };
    return (
        <motion.aside variants={asideVariants} initial='hidden' animate='visible' className={`${styles.aside} ${theme === 'dark' ? styles.aside_dark : ''}`}>
            {children}
        </motion.aside>
    );
};

export default Aside;