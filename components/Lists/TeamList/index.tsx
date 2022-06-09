import { useEffect } from "react";
import UserProfile from "../../UserProfile";
import styles from "./teamlist.module.css";

const TeamList = (props:any)=> {
    const { team } = props;

    console.log(team);

    return (
        <div className={styles.container}>
            {   
                (team.length > 0)
                ?   team.map((teamMem:any, count:any)=> {
                        if(count <= 3) {
                            return  <div className={styles.userprofile_wrapper}>
                                        <UserProfile firstname={teamMem.firstname} lastname={teamMem.lastname} />
                                    </div>
                        }
                    })
                :   
                (team.length > 3) ? <div className={styles.count}> +3 </div> : ""
            }
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