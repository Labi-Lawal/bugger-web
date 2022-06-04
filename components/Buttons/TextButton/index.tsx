import SwingingDotsLoader from "../../Loader/SwingingDotsLoader";
import styles from "./textbutton.module.css";

export default function InputField(props:any) {
    const { label, loading, onclick } = props;
    return(
        <button className={styles.text_button} onClick={(e)=> onclick(e) } >
            {
                (loading)
                ? <div className={styles.loader_wrapper}> <SwingingDotsLoader /> </div>
                : label 
            } 
        </button>
    );
};