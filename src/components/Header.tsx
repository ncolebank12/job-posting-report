import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = ({ title }: { title: string }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            {location.pathname !== '/' && (
                <button onClick={() => navigate(-1)}>Back</button>
            )}
            <h1>{title}</h1>
        </header>
    );
}

export default Header;