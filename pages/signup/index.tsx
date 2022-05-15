import Link from "next/link";
import { useState } from "react";
import TextButton from "../../components/Buttons/TextButton";
import InputField from "../../components/InputField";
import styles from "../../styles/auth.module.css";

const [fullnameModel, setFullnameModel] = useState({
    type:'text',
    value:'',
    error:'',
    label:'Full Name',
    hint: 'eg. firstname lastname'
}), 
[emailModel, setEmailModel] = useState({
    type: 'email',
    value:'',
    error:'',
    label:'Email',
    hint: ''
}),
[passwordModel, setPasswordModel] = useState({
    type: 'password',
    value:'',
    error:'',
    label:'Password',
    hint: ''
});


const validateFullname = ()=> {
    if(!fullnameModel.value) {
        fullnameModel.error = 'Field cannot be empty'
        return false
    }
    if(fullnameModel.value.split(' ').length != 2) {
        fullnameModel.error = 'Please only provide your first and lastname seperated by a whitespace'
        console.log(fullnameModel);
        return false
    }

    fullnameModel.error = '';
    return true;
}

const verifyEmail = ()=> {

}

// const verify

const registerUser = ()=> {

}


export default function SignUp (props:any) {
    return (
        <section>
            <div className={styles.title}>BUGGER</div>

            <form className={styles.form_frame}>
                <div className={styles.heading}>Create a new account</div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        type={fullnameModel.type}
                        label={fullnameModel.label}
                        value={fullnameModel.value}
                        hint={fullnameModel.hint}
                        error={fullnameModel.error}
                        onKeyPress={validateFullname}
                    />
                </div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        type={emailModel.type}
                        label={emailModel.label}
                        value={emailModel.value}
                        hint={emailModel.hint}
                        error={emailModel.error}
                        onKeyPress={validateFullname}
                    />
                </div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        type={passwordModel.type}
                        label={passwordModel.label}
                        value={passwordModel.value}
                        hint={passwordModel.hint}
                        error={passwordModel.error}
                        onKeyPress={validateFullname}
                    />
                </div>
                
                <div className={styles.signin_btn_wrapper}>
                    <TextButton label="SIGN UP" onclick={registerUser} />
                </div>

                <div className={styles.gotosignup}>
                    <div>Already have an account?</div>
                    <Link href="/signin"><a><strong className={styles.signup}>Sign In</strong></a></Link>
                </div>
            </form>
        </section>
    );
}