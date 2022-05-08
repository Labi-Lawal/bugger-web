import styles from "./textfield.module.css";

export default function InputField(props:any) {
    const { label } = props;
    return(
        <div className={styles.text_field}>
            <label className={styles.label}>{label}</label>
            <div className={styles.textarea} contentEditable></div>
            <div className={styles.error}></div>
        </div>
    );
};