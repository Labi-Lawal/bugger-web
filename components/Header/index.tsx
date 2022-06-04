import styles from "./header.module.css";
import TextButton from "../Buttons/TextButton";
import { useRouter } from "next/router";

export default function Header (props:any) {

    const router = useRouter();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>BUGGER</div>

            <div className={styles.signin_btn_wrapper}>
                <TextButton label="Sign In" onclick={()=> router.push('/signin') } />
            </div>
        </header>
    );
}