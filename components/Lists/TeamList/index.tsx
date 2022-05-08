import UserProfile from "../../UserProfile";
import styles from "./teamlist.module.css";

const TeamList = (props:any)=> {
    return (
        <div className={styles.container}>
            <div className={styles.userprofile_wrapper}>
                <UserProfile imageURL={require("../../../assets/user1.jpg")} />
            </div>
            <div className={styles.userprofile_wrapper}>
                <UserProfile imageURL={require("../../../assets/user2.jpg")} />
            </div>
            <div className={styles.userprofile_wrapper}>
                <UserProfile imageURL={require("../../../assets/user5.jpg")} />
            </div>
            <div className={styles.count}> +3 </div>
        </div>
    );
}

const MiniTeamList = (props:any)=> {
    return (
        <div className={`${styles.container} ${styles.mini}` }>
            <div className={`${styles.userprofile_wrapper} ${styles.mini}` }>
                <UserProfile imageURL={require("../../../assets/user1.jpg")} />
            </div>
            <div className={`${styles.userprofile_wrapper} ${styles.mini}` }>
                <UserProfile imageURL={require("../../../assets/user2.jpg")} />
            </div>
            <div className={`${styles.userprofile_wrapper} ${styles.mini}` }>
                <UserProfile imageURL={require("../../../assets/user5.jpg")} />
            </div>
            <div className={styles.count}> +3 </div>
        </div>
    );
}

export { TeamList, MiniTeamList };