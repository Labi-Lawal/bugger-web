import styles from "./iconbutton.module.css";

export default function IconButton (props:any) {

    return (
        <button className={styles.container} onClick={ ()=> props.onclick() } title={props.title}>
            <props.icon />
        </button>
    );
}