import React from 'react';
import styles from "@/styles/Comments.module.scss"
import Card from "@/components/card";
import {IComment} from "@/model";
import Avatar from "@/components/avatar";
import {getDate} from "@/utils";
import {useGetAuthMeQuery} from "@/store/authApi";

const Comments = ({comments, submitHandle, deleteHandle, newComment,setNewComment}:{comments:IComment[], submitHandle: ()=> void, deleteHandle: any, newComment: string, setNewComment:any}) => {
    const {data} = useGetAuthMeQuery()
    return (
       <Card>
           <div>
               {!!comments ? <ul className={styles.comments}>
                   {comments.map((comment)=>(
                       <li className={styles.comment}>
                           <div className={styles.comment_info}>
                               <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${comment.author.avatarUrl}`} />
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
                           {!!data && data._id === comment.author._id &&<button onClick={deleteHandle(comment._id)} className={styles.delete}>
                               <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                                    aria-hidden="true" viewBox="0 0 24 24" data-testid="ClearIcon">
                                   <path
                                       d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                               </svg>
                           </button>}
                       </li>
                   ))}
               </ul> : <div className={styles.no_comments}>So far no comments</div>}
               <form
                    className={styles.comments_form}
                    onSubmit={submitHandle}
               >
                   <textarea placeholder='comments' value={newComment} onChange={({target})=>setNewComment(()=>target.value)} />
                   {!!newComment.trim() &&
                   <button type={"submit"}>
                       Send
                   </button>
                   }
               </form>
           </div>
       </Card>
    );
};

export default Comments;

