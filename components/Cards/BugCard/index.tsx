import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import styles from "./bugcard.module.css";
import { MiniTeamList } from "../../Lists/TeamList";

export default function BugCard (props:any) {

    const { id, title, desc, status, date, draggable, dragStart, dragEnd } = props;

    return (
        <div className={styles.container} draggable={draggable} onDragStart={(e)=> dragStart(status, id)} onDragEnd={(e)=> dragEnd(e)}>
            <div className={styles.top}>
                <div className={styles.title}> { title } </div>
                <FaEllipsisV className={styles.menu} />
            </div>
            
            <div className={styles.meta_info}>
                <div className={styles.date}>Apr 21</div>
                <FaUserCircle className={styles.user} />
                <div className={styles.assignee}> John Meyer </div>
            </div>

            <div className={styles.desc}> { desc } </div>
            
            <div className={styles.action}>
                <div className={styles.comments}>
                    <BiCommentDetail className={styles.comment_icon} />
                    <div className={styles.digit}> 3 </div>
                </div>
                <div className={styles.teamlist_wrapper}>
                    <MiniTeamList />
                </div>
            </div>
        </div>
    );
}