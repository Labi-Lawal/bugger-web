import styles from "./inputfield.module.css";

export default function InputField(props:any) {

    const { type, label, hint, error, onKeyPress } = props;

    return(
        <div className={styles.input_field}>
            <label className={styles.label}> { label } </label>
            <input type={type} className={styles.input} placeholder={hint} onInput={ (e:any)=> onKeyPress(e.target.value) } />
            <div className={styles.error}> { error } </div>
        </div>
    );
};








// COLD BREW IS SWEETER, IT ALSO CONTAINS MORE CAFFIENE 