import { useState } from "react";
import Link from "next/link";
import TextButton from "../../components/Buttons/TextButton";
import InputField from "../../components/InputField";
import styles from "../../styles/auth.module.css";
import axios from "axios";
import ErrorModal from "../../components/Modals/ErrorModal";

export default function SignUp (props:any) {    

    const [fullnameModel, setFNModel] = useState({ //Fullname is shortened to FN for easy ref
        type:'text',
        name: 'fullname',
        value:'',
        error:'', 
        label:'Full Name',
        hint: 'eg. firstname lastname'
    }), 
    [emailModel, setEmailModel] = useState({
        type: 'email',
        name: 'email',
        value:'',
        error:'',
        label:'Email',
        hint: ''
    }),
    [passwordModel, setPasswordModel] = useState({
        type: 'password',
        name: 'password',
        value:'',
        error:'',
        label:'Password',
        hint: ''
    }),
    [errorModel, setErrorModel] = useState({
        message: '',
        errorOccurred: false
    });;
    
    const setInput = (inputItem:any, model:any)=> {
        const updated = {...model};
        updated.value = inputItem;
        if(model.name == 'fullname') {
            validateFN(updated);
            setFNModel(updated);
        }
        if(model.name == 'email') { 
            validateEmail(updated)
            setEmailModel(updated);
        }
        if(model.name == 'password') { 
            validatePassword(updated)
            setPasswordModel(updated);
        }
    }

    const validateFN = (updateItem:any)=> {
        if(!updateItem.value) {
            updateItem.error = 'Field cannot be empty'
            return false;
        }
        if(updateItem.value.split(' ').length < 2) {
            updateItem.error = 'Please both your first and last names are needed'
            return false;
        }
        if(updateItem.value.split(' ').length > 2) {
            updateItem.error = 'Please only your first and last names are needed'
            return false;
        }
        if(updateItem.value.split(' ')[1] == '' || updateItem.value.split(' ')[0] == '') {
            updateItem.error = 'Please both your first and last names are needed'
            return false;
        }

        updateItem.error = ''
        return true;
    }

    const validateEmail = (updateItem:any)=> {
        const emailRegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        if(!updateItem.value) {
            updateItem.error = 'Field cannot be empty'
            return false;
        }
        if(!emailRegExp.test(updateItem.value)) {
            updateItem.error = 'Email is not valid';
            return false;
        }

        updateItem.error = ''
        return true;
    }

    const validatePassword = (updateItem:any)=> {
        if(!updateItem.value) {
            updateItem.error = 'Field cannot be empty'
            return false;
        }
        if(updateItem.value.length < 8) {
            updateItem.error = 'Must be minimum of 8 characters'
            return false;
        }

        updateItem.error = ''
        return true;
    }

    const registerUser = ()=> {

        if(!validateFN(fullnameModel)) {
            setFNModel({...fullnameModel});
            return;
        }
        

        const payload = {
            firstname: fullnameModel.value.split(' ')[0],
            lastname: fullnameModel.value.split(' ')[1],
            email: emailModel.value,
            password: passwordModel.value
        }

        axios.post('/api/v1/users/signup', payload)
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
            
            <form className={styles.form_frame} onSubmit={(e)=> e.preventDefault()}>
                <div className={styles.heading}>Create a new account</div>

                {
                    (errorModel.errorOccurred)
                    ? <ErrorModal message={errorModel.message} onModalClick={closeModalFn} />
                    : ''
                }

                <div className={styles.input_wrapper}>
                    <InputField
                        type={fullnameModel.type}
                        label={fullnameModel.label}
                        value={fullnameModel.value} 
                        hint={fullnameModel.hint}
                        error={fullnameModel.error}
                        onKeyPress={(input:any)=> setInput(input, fullnameModel)}
                    />
                </div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        type={emailModel.type}
                        label={emailModel.label}
                        value={emailModel.value}
                        hint={emailModel.hint}
                        error={emailModel.error}
                        onKeyPress={(input:any)=> setInput(input, emailModel)}
                    />
                </div>
                <div className={styles.input_wrapper}>
                    <InputField 
                        type={passwordModel.type}
                        label={passwordModel.label}
                        value={passwordModel.value}
                        hint={passwordModel.hint}
                        error={passwordModel.error}
                        onKeyPress={(input:any)=> setInput(input, passwordModel)}
                    />
                </div>
                 
                <div className={styles.signin_btn_wrapper}>
                    <TextButton label="SIGN UP" onclick={registerUser}/>
                </div>

                <div className={styles.gotosignup}>
                    <div>Already have an account?</div>
                    <Link href="/signin"><a><strong className={styles.signup}>Sign In</strong></a></Link>
                </div>
            </form>
        </section>
    );
}