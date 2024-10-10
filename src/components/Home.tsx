import styles from "../styles/Home.module.css"
import common from "../styles/Common.module.css"
import { Link } from "react-router-dom";
import { JobPostData } from "../types";

const UserStatMessage = ({ count, message }: { count: number | undefined, message: string }) => {
    let endMessage = "";

    if (!count || count === 0) {
        endMessage = `0 users ${message}`;
    } else if (count === 1) {
        endMessage = `1 user ${message}`;
    } else {
        endMessage = `${count} users ${message}`;
    }

    return <div>{endMessage}</div>
}

const Home = ({ postData, isValidSite, isReported }: { postData: JobPostData | undefined, isValidSite: boolean, isReported: boolean }) => {
    return (
        isValidSite ? 
        <div className={styles.container}>
                <UserStatMessage message="thought this listing was fake." count={postData?.fakeListingCount} />
                <UserStatMessage message="felt that the company posting this job is shady." count={postData?.shadyCompanyCount} />
                <div className={styles.footer}>
                    <Link className={common.button} to="/comments">View Comments</Link>
                    <Link className={isReported ? common.submitted : common.button} 
                    to={isReported ? "#" : "/report"}>{isReported ? "Submitted" : "Report" }</Link>
                </div>
                </div >
            :
        <div className={styles.container}>
            <p>This URL does not have a valid job listing. <br/>
            Please note that this extension currently only works for LinkedIn
            and Indeed.
            </p>
        </div>
        

    )
}

export default Home;