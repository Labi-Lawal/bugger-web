import styles from "./inputfield.module.css";

export default function InputField(props:any) {
    
    const { type, label, value, hint, error, onKeyPress } = props;

    return(
        <div className={styles.input_field}>
            <label className={styles.label}> {label} </label>
            <input type={type} className={styles.input} onKeyDown={()=> onKeyPress()} />
            <div className={styles.error}> {error} </div>
        </div>
    );
};