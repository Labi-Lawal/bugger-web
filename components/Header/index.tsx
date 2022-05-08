import styles from "./header.module.css";
import TextButton from "../Buttons/TextButton";

export default function Header (props:any) {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>BUGGER</div>

            <div className={styles.signin_btn_wrapper}>
                <TextButton label="Sign In" />
            </div>
        </header>
    );
}