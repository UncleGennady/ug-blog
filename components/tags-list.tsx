import React from 'react';
import Aside from "@/components/aside";
import styles from '@/styles/TagsList.module.scss'
import {useAppSelector} from "@/hook";

const TagsList = ({tags, setCurrentTag}:{tags:string[], setCurrentTag:any}) => {
    const theme = useAppSelector(state => state.theme.value)
    return (
        <Aside>
            <h2>Tags</h2>
            <ul className={styles.list}>
                 {tags.map((tag,index)=>(
                     <li key={index} className={styles.element}>
                         <button className={`${styles.button} ${theme === 'dark' ? styles.button_dark : ''}`} onClick={()=>setCurrentTag(tag)}>
                             <div className={styles.icon}>
                                 <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                                        aria-hidden="true" viewBox="0 0 24 24" data-testid="TagIcon" fill={theme=== 'dark' ? '#FFFBEB' : 'black'} >
                                 <path
                                     d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path>
                             </svg>
                             </div>
                             <p>{tag}</p>
                         </button>
                     </li>))}
            </ul>
        </Aside>
    );
};

export default TagsList;