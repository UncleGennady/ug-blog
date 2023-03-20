import React from 'react';
import Link from "next/link";
import styles from '@/styles/PostButton.module.scss'
import {useDeletePostMutation} from "@/store/postApi";
import {useRouter} from "next/router";

const PostButton = ({id}:{id:string}) => {
    const [deletePost] = useDeletePostMutation()
    const  router = useRouter()
    const deleteHandle = () => {
        if(window.confirm('Delete post ?')){
            // @ts-ignore
            deletePost(id)
        }
    }
    return (
        <div className={styles.post_button}>
            <Link className={styles.edit} href={`/edit-post/${id}`}>
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                     aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon">
                    <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
            </Link>
            <button onClick={deleteHandle} className={styles.delete}>
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                     aria-hidden="true" viewBox="0 0 24 24" data-testid="ClearIcon">
                    <path
                        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            </button>
        </div>
    );
};

export default PostButton;