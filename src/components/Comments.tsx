import { JobPostData } from "../types";

const Comments = ({ postData }: { postData: JobPostData | undefined}) => {

    return (
        postData?.comments ? postData.comments.map((comment) => {
            return <div>{comment}</div>
        }) : <p>no comments for this listing.</p>
    )
}

export default Comments;