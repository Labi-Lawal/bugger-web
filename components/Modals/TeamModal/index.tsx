import styles from "./teammodal.module.css";
import AddTeamModal from "./AddTeamModal";

export default function TeamModal(props:any) {
    return (
        <div className={styles.container}>
            <div className={styles.layer} onClick={()=> props.closeModal()}></div>
            <div className={styles.add_team_modal_wrapper}>
                <AddTeamModal />
            </div>
        </div>
    );
} 