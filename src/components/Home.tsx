import styles from "../styles/Home.module.css"
import common from "../styles/Common.module.css"
import { Link } from "react-router-dom";
import { JobPostData } from "../types";

const UserStatMessage = ({ count, message }: { count: number | undefined, message: string }) => {
    let endMessage = "";

    if (!count) {
        endMessage = "Loading...";
    } else if (count === 0) {
        endMessage = `No users ${message}`;
    } else if (count === 1) {
        endMessage = `1 user ${message}`;
    } else {
        endMessage = `${count} users ${message}`;
    }

    return <div>{endMessage}</div>
}

const Home = ({ postData, isValidSite, isReported }: { postData: JobPostData | undefined, isValidSite: boolean, isReported: boolean }) => {
    // TODO: update styles for if isValidSite and isReported
    return (
        <div className={styles.container}>
            <UserStatMessage message="thought this listing was fake." count={postData?.fakeListingCount} />
            <UserStatMessage message="felt that the company posting this job is shady." count={postData?.shadyCompanyCount} />
            <div className={styles.footer}>
                <Link className={common.button} to="/comments">View Comments</Link>
                <Link className={common.button} to="/report">Report</Link>
            </div>
        </div >
    )
}

export default Home;