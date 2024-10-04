import styles from "../styles/Home.module.css"
import { Link } from "react-router-dom";
import { JobPostData } from "../types";

const Home = ({ postData }: { postData: JobPostData | undefined }) => {
    // const [jobPostData, setJobPostData] = useState<JobPostData>();
    // setJobPostData(undefined);
    return (
        <div className={styles.container}>
            <div>{postData?.fakeListingCount} users thought this listing was fake.</div>
            <div>{postData?.shadyCompanyCount} users felt the company posting this job is shady.</div>
            <Link className={styles.viewComments} to="/comments">View Comments</Link>
            <Link className={styles.report} to="/report">Report</Link>
        </div >
    )
}

export default Home;