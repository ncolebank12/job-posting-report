import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import backIcon from "../assets/back-96.png"

const Header = ({ title }: { title: string }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                {/* TODO: extension icon goes here */}
                <h1 className={styles.title}>{title}</h1>
            </header >
            {location.pathname !== '/' && (
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <img src={backIcon} alt="Back" className={styles.backIcon} />
                    Back
                </button>
            )}
        </div >
    );
}

export default Header;