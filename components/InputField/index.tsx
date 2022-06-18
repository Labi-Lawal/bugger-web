import styles from "./inputfield.module.css";

export default function InputField(props:any) {

    const { type, label, hint, error, onKeyPress } = props;

    return(
        <div className={styles.input_field}>
            {
                (label) 
                ? <label className={styles.label}> { label } </label>
                : null
            }
            <input 
                type={type}
                className={`${styles.input} ${(!label) ? styles.no_label_input :null}`}
                placeholder={hint}
                onInput={ (e:any)=> onKeyPress(e.target.value) }
            />
            <div className={styles.error}> { error } </div>
        </div>
    );
};








// COLD BREW IS SWEETER, IT ALSO CONTAINS MORE CAFFIENE 