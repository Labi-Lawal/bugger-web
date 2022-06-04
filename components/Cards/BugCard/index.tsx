import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import styles from "./bugcard.module.css";
import { MiniTeamList } from "../../Lists/TeamList";
import { useState } from "react";
import axios from "axios";

export default function BugCard (props:any) {

    const { id, taskId, title, desc, status, date, createdBy, comments, draggable, dragStart, dragEnd, deleteTask } = props;
    const [menuVisibility, setMenuVisibility] = useState(false);
    
    const detDate = (date:any)=> {
        date = date.split("T")[0];

        const year = date.split("-")[0],
        month = date.split("-")[1],
        day = date.split("-")[2];

        date = new Date(year, month-1, day).toLocaleDateString('en-us', {
            month: 'short',
            day: 'numeric'
        });

        return date;
    }

    const toggleMenu = ()=> setMenuVisibility(!menuVisibility);

    return (
        <div className={styles.container} draggable={draggable} onDragStart={(e)=> dragStart(status, id)} onDragEnd={(e)=> dragEnd(e)}>
            <div className={styles.top}>
                <div className={styles.title}> { title } </div>
                <FaEllipsisV className={styles.menu} onClick={()=> toggleMenu()} />
                {
                    (menuVisibility)
                    ?   <div className={styles.menu_container}>
                            <div>edit</div>
                            <div onClick={()=> deleteTask(taskId)}>delete</div>
                        </div>
                    :   ""
                }
            </div>
            
            <div className={styles.meta_info}>
                <div className={styles.date}> { detDate(date) } </div>
                <FaUserCircle className={styles.user} />
                <div className={styles.assignee}> { createdBy } </div>
            </div>

            <div className={styles.desc}> { desc } </div>
            
            <div className={styles.action}>
                        { 
                            (comments.length === 0) 
                            ?   <div className={styles.no_comment}>No Comments</div>
                            :   <div className={styles.comments}>
                                    <BiCommentDetail className={styles.comment_icon} />
                                    <div className={styles.digit}> { comments.length } </div>
                                </div>
                        } 
                <div className={styles.teamlist_wrapper}>
                    <MiniTeamList />
                </div>
            </div>
        </div>
    );
}