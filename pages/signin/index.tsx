import { useState } from "react";
import Link from "next/link";
import TextButton from "../../components/Buttons/TextButton";
import InputField from "../../components/InputField";
import styles from "../../styles/auth.module.css";
import axios from "axios";
import ErrorModal from "../../components/Modals/ErrorModal";

export default function SignIn (props:any) {

    const [emailModel, setEmailModel] = useState({
        label: 'email',
        type: 'email',
        name: 'email',
        value: '',
        error: '',
        hint: ''
    }),
    [passwordModel, setPasswordModel] = useState({
        label: 'password',
        type: 'password',
        name: 'password',
        value: '',
        error: '',
        hint: ''
    }),
    [errorModel, setErrorModel] = useState({
        message: '',
        errorOccurred: false
    });

    const setInput = (inputItem:any, model:any)=> {
        if(model.name === 'email') {
            model.value = inputItem;
            validateEmail(model);
            setEmailModel({...model});
        }
        if(model.name === 'password') {
            model.value = inputItem;
            validatePassword(model);
            setPasswordModel({...model});
        }
    }

    const validateEmail = (updateItem:any)=> {
        if(updateItem.value === '') {
            updateItem.error = 'Field cannot be empty';
            return false;
        }

        updateItem.error = '';
        return true;
    }

    const validatePassword = (updateItem:any)=> {
        if(updateItem.value === '')  {
            updateItem.error = 'Field cannot be empty';
            return false;
        }

        updateItem.error = '';
        return true;
    }

    const preventDefault = (e:any)=> e.preventDefault();

    const signUserIn = ()=> {
        if(!validateEmail(emailModel)) {
            setEmailModel({...emailModel});
            return;
        } 
        if(!validatePassword(passwordModel)) { 
            setPasswordModel({...passwordModel});
            return;
        }

        const payload = {
            email: emailModel.value,
            password: passwordModel.value
        }

        axios.post('/api/v1/users/signin', payload)
        .then((response)=> console.log(response.data))
        .catch((error)=> {
            console.error(error.response);
            setErrorModel({ message: error.response.data.message, errorOccurred: true });
        });
    }

    const closeModalFn = ()=> {
        errorModel.errorOccurred = false;
        setErrorModel({...errorModel});
    }

    return (
        <section>
            <div className={styles.title}>BUGGER</div>

            <form className={styles.form_frame} onSubmit={preventDefault}>
                <div className={styles.heading}>Login to your dashboard</div>

                {
                    (errorModel.errorOccurred)
                    ? <ErrorModal message={errorModel.message} onModalClick={closeModalFn} />
                    : ''
                }

                <div className={styles.input_wrapper}>
                    <InputField 
                        label={emailModel.label}
                        type={emailModel.type}
                        value={emailModel.value}
                        error={emailModel.error}
                        hint={emailModel.hint}
                        onKeyPress={(inputItem:any)=> setInput(inputItem, {...emailModel})}
                    />
                </div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        label={passwordModel.label}
                        type={passwordModel.type}
                        value={passwordModel.value}
                        error={passwordModel.error}
                        hint={passwordModel.hint}
                        onKeyPress={(inputItem:any)=> setInput(inputItem, {...passwordModel})}
                    />
                </div>
                <div className={styles.forgotpassword}>Forgot Password</div>
                <div className={styles.signin_btn_wrapper}>
                    <TextButton label="SIGN IN" onclick={signUserIn} />
                </div>

                <div className={styles.gotosignup}>
                    <div>Don't have an account?</div>
                    <Link href="/signup"><a><strong className={styles.signup}>Sign Up</strong></a></Link>
                </div>
            </form>
        </section>
    );
}