import { userInfo } from "os";
import detDate from "../../../utils/detDate";
import UserProfile from "../../UserProfile";
import styles from "./commentcard.module.css";

export default function CommentCard(props:any) {
    
    const { user, date, comment } = props;

    return (
        <div className={styles.container}>
            <div className={styles.userprofile_wrapper}>
                <UserProfile firstname={user.firstname} lastname={user.lastname} showDetails={true} />
                <div className={styles.date}> { detDate(date) } </div>
            </div>
            <div className={styles.comment}> { comment } </div>
        </div>
    )
}