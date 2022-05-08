import styles from "./textbutton.module.css";

export default function InputField(props:any) {
    const { label } = props;
    return(
        <button className={styles.text_button} onClick={(e)=>props.createTask(e) } >
            { label }
        </button>
    );
};