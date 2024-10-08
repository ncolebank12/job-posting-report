import { JobPostData } from "../types";
import styles from "../styles/Comments.module.css"

const Comments = ({ postData }: { postData: JobPostData | undefined }) => {
    // TODO: add dates to comments
    return (
        <div className={styles.container}>
            {
                postData?.comments ? postData.comments.map((comment) => {
                    return <div>{comment}</div>
                }) : <p>no comments for this listing.</p>
            }
        </div>
    )
}

export default Comments;