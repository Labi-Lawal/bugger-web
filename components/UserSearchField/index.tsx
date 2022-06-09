import TextButton from "../Buttons/TextButton";
import InputField from "../InputField";
import styles from "./usersearchfield.module.css"

export default function SearchField (props:any) {

    const { type, label, hint, name, error, value, onButtonClick } = props;
    var inputValue:any = value;

    return (
        <div className={styles.container}>
            <label className={styles.label}> { label } </label>
            <div className={styles.input_field}>
                <input type={type} className={styles.input} placeholder={hint} onChange={(e:any)=> { inputValue = e.target.value } } />
                <div className={styles.invite_btn_wrapper}>
                    <TextButton label="Invite" onclick={ ()=> { onButtonClick(inputValue) } } />
                </div>
            </div>
            <div className={styles.error}> { error } </div>
        </div>
    );
}