import styles from "./errormodal.module.css";
import { FaTimes } from "react-icons/fa";

export default function ErrorModal (props:any) {

    const { message, onModalClick } = props;

    return (
        <div className={styles.container}>
            <div className={styles.message}>{ message }</div>
            <FaTimes className={styles.close_icon} onClick={onModalClick} />
        </div>
    );

}