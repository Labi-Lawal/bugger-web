import styles from "./swingingdotsloader.module.css";

export default function SwingingDotsLoader(props:any) {
    return (
        // <div className={}>
            <div className={styles.lds_ellipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        // </div>
    );
}