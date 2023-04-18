import React from "react";
import styles from "@/styles/Burger.module.scss"
import {useAppSelector} from "@/hook";
import {JSXElement} from "@/model";


const Burger = ({children, isClicked, updateMenu}:{children:JSXElement | JSXElement[] | any, isClicked: boolean, updateMenu: ()=>void}) => {
    const theme = useAppSelector((state) => state.theme.value)

    return(
            <>
                <div className={styles.burger_menu} onClick={updateMenu}>
                    <div className={`${styles.burger_bar} ${theme==='dark' ? styles.burger_bar_dark : ''} ${isClicked ? styles.clicked : styles.unclicked}`}></div>
                    <div className={`${styles.burger_bar} ${theme==='dark' ? styles.burger_bar_dark : ''} ${isClicked ? styles.clicked : styles.unclicked}`}></div>
                    <div className={`${styles.burger_bar} ${theme==='dark' ? styles.burger_bar_dark : ''} ${isClicked ? styles.clicked : styles.unclicked}`}></div>
                </div>
                <ul className={`${styles.menu} ${ theme==='dark' ? styles.menu_dark : ''} ${isClicked ? styles.visible : styles.hidden}`}>
                    {children}
                </ul>
            </>

    )
}

export default Burger