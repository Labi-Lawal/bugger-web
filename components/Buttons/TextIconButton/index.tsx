import SwingingDotsLoader from "../../Loader/SwingingDotsLoader";
import styles from "./texticonbutton.module.css";

export default function InputField(props:any) {
    const { label, Icon, loading, onclick } = props;
    return(
        <button className={styles.text_button} onClick={(e)=> onclick(e) } >
            {
                (loading) ?
                    <div className={styles.loader_wrapper}> <SwingingDotsLoader /> </div>
                    :
                    <div className={styles.btn_content}>
                        <Icon />
                        <div className={styles.text}> { label } </div>
                    </div>
            } 
        </button>
    );
};