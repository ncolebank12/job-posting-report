import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import backIcon from "../assets/back-96.png"
import appIcon from "../assets/icon500.png"

const Header = ({ title }: { title: string }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const nonBackPaths = ['/', '/success']
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src={appIcon} height={25} className={styles.appIcon} /> 
                <h1 className={styles.title}>{title}</h1>
            </header >
            {!nonBackPaths.includes(location.pathname) && (
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <img src={backIcon} alt="Back" className={styles.backIcon} />
                    Back
                </button>
            )}
        </div >
    );
}

export default Header;