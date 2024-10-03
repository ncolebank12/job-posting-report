import styles from "../styles/Home.module.css"
import { Link } from "react-router-dom";

const Home = () => {
    // const [jobPostData, setJobPostData] = useState<JobPostData>();
    // setJobPostData(undefined);
    const jobPostData = { fakeListingCount: 0, shadyCompanyCount: 1 }
    return (
        <div className={styles.container}>
            <div>{jobPostData?.fakeListingCount} users thought this listing was fake.</div>
            <div>{jobPostData?.shadyCompanyCount} users felt the company posting this job is shady.</div>
            <Link className={styles.viewComments} to="/comments">View Comments</Link>
            <Link className={styles.report} to="/report">Report</Link>
        </div >
    )
}

export default Home;