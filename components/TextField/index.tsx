import styles from "./textfield.module.css";

export default function TextField(props:any) {
    const { label, hint, error, onKeyPress } = props;
    return(
        <div className={styles.text_field}>
            <label className={styles.label}>{label}</label>
            <div className={styles.textarea} contentEditable onKeyUp={ (e:any)=> onKeyPress(e.target.innerText) }></div>
            <div className={styles.error}> { error } </div>
        </div>
    );
};