import { JobPostData } from "../types";
import styles from "../styles/Comments.module.css";
import AvatarIcon from "../assets/avatar-icon.png";

const Comments = ({ postData }: { postData: JobPostData | undefined }) => {
    return (
        <div className={styles.container}>
            <div className={styles.spacer} />
            {
                postData?.comments ? postData.comments.map((comment, i) => {
                    return (
                        <div key={i} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <img className={styles.img} src={AvatarIcon}/>
                                {new Date(comment.timestamp.seconds * 1000).toDateString()}
                            </div>
                            <div className={styles.commentBody}>{comment.body}</div>
                        </div>
                    )
                }) : <p>no comments for this listing.</p>
            }
        </div>
    )
}

export default Comments;