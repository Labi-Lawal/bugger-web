import styles from "./circularprogressloader.module.css";

export default function CircularProgressLoader(props:any) {
    
    const { color, size } = props;

    return (
        <div className={styles.lds_ring}>
            <div style={{borderColor: color}}></div>
            <div style={{borderColor: color}}></div>
            <div style={{borderColor: color}}></div>
            <div style={{borderColor: color}}></div>
        </div>
    );
}