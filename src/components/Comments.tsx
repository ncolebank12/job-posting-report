import { JobPostData } from "../types";
import styles from "../styles/Comments.module.css"

const Comments = ({ postData }: { postData: JobPostData | undefined }) => {
    return (
        <div className={styles.container}>
            {
                postData?.comments ? postData.comments.map((comment, i) => {
                    return (
                        <div key={i} className={styles.comment}>
                            <div className={styles.commentHeader}>{new Date(comment.timestamp.seconds * 1000).toDateString()}</div>
                            <div className={styles.commentBody}>{comment.body}</div>
                        </div>
                    )
                }) : <p>no comments for this listing.</p>
            }
        </div>
    )
}

export default Comments;