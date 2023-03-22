import React from 'react';
import styles from "@/styles/CommentsList.module.scss";
import Aside from "@/components/aside";
import {IComment} from "@/model";
import Avatar from "@/components/avatar";

const CommentsList = ({comments}:{comments:IComment[]}) => {
    return (
        <Aside>
            <h2>Comments</h2>
            <ul className={styles.list}>
                {comments.map((comment)=>(
                    <li key={comment._id} className={styles.item}>
                        {!!comment.author.avatarUrl && <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${comment.author.avatarUrl}`}/>}
                        <div className={styles.info}>
                            <h4>{comment.author.fullName}</h4>
                            <p>{comment.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Aside>
    );
};

export default CommentsList;