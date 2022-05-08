import TextButton from "../../../components/Buttons/TextButton";
import InputField from "../../../components/InputField";
import styles from "../auth.module.css";

export default function Auth (props:any) {
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
                    <div>Already have an account</div>
                    <strong className={styles.signup}>Sign Up</strong>
                </div>
            </form>
        </section>
    );
}