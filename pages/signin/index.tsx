import Link from "next/link";
import TextButton from "../../components/Buttons/TextButton";
import InputField from "../../components/InputField";
import styles from "../../styles/auth.module.css";

export default function SignIn (props:any) {
    return (
        <section>
            <div className={styles.title}>BUGGER</div>

            <form className={styles.form_frame}>
                <div className={styles.heading}>Login to your dashboard</div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        label="Email"
                    />
                </div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        label="Password"
                    />
                </div>
                <div className={styles.forgotpassword}>Forgot Password</div>
                <div className={styles.signin_btn_wrapper}>
                    <TextButton label="SIGN IN" />
                </div>

                <div className={styles.gotosignup}>
                    <div>Don't have an account?</div>
                    <Link href="/signup"><a><strong className={styles.signup}>Sign Up</strong></a></Link>
                </div>
            </form>
        </section>
    );
}