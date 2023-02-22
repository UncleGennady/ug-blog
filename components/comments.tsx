import React from 'react';
import styles from "@/styles/Comments.module.scss"
import Card from "@/components/card";
import {IComment} from "@/model";
import Avatar from "@/components/avatar";
import {getDate} from "@/utils";

const Comments = ({comments}:{comments:IComment[]}) => {
    return (
       <Card>
           <div>
               <ul className={styles.comments}>
                   {comments.map((comment)=>(
                       <li className={styles.comment}>
                           <div className={styles.comment_info}>
                               <Avatar src={`https://ug-mern-blog.onrender.com${comment.author.avatarUrl}`} />
                               <div className={styles.comment_text}>
                                   <p>
                                       <strong>
                                           {comment.author.fullName}
                                       </strong>
                                   </p>
                                   <p>
                                       {comment.text}
                                   </p>
                               </div>
                           </div>
                           <div className={styles.comment_date}>
                               {getDate(comment.createdAt)}
                           </div>
                       </li>
                   ))}
               </ul>
               <form className={styles.comments_form}>
                   <textarea placeholder='comments'/>
                   <button type={"submit"}>
                       Send
                   </button>
               </form>
           </div>
       </Card>
    );
};

export default Comments;

