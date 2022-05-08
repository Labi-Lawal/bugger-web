import styles from "./inputfield.module.css";

export default function InputField(props:any) {
    
    const { label } = props;

    return(
        <div className={styles.input_field}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} />
            <div className={styles.error}></div>
        </div>
    );
};