import checkmark from '../assets/checkmark.svg'
import styles from '../styles/Success.module.css'

const Success = () => {
    return (
        <div className={styles.container}>
            <img className={styles.img} src={checkmark} height={120}/>
            <h2>Submission sent successfully.</h2>
        </div>
    )
}

export default Success;