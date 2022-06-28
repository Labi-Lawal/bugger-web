import styles from "./swingingdotsloader.module.css";

export default function SwingingDotsLoader(props:any) {
    const { color } = props;
    return (
        // <div className={}>
            <div className={styles.lds_ellipsis} style={{background: color}}>
                <div style={{background: color}}></div>
                <div style={{background: color}}></div>
                <div style={{background: color}}></div>
                <div style={{background: color}}></div>
            </div>
        // </div>
    );
}