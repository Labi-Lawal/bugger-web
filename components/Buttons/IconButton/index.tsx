import styles from "./iconbutton.module.css";

export default function IconButton (props:any) {

    return (
        <button className={styles.container} onClick={ ()=> props.onClick() } >
            <props.icon />
        </button>
    );
}