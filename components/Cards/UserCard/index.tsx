import styles from "./usercard.module.css";

export default function UserCard (props:any) {

    const { email } = props;

    return (
        <div className={styles.container}>
            <div className={styles.dp}>
                { email.split('')[0] }
            </div>
            <div className={styles.email}>
                { email }
            </div>
        </div>
    );
}