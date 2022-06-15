import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import styles from "./bugcard.module.css";
import { MiniTeamList } from "../../Lists/TeamList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function BugCard (props:any) {

    const { id, taskId, title, desc, status, team, date, createdBy, comments, draggable, dragStart, dragEnd, deleteTask } = props;
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [creator, setCreator]:any = useState({});

    const config = {
        headers: {
            'Authorization': `Bearer ${useSelector((state:any) => state.user.token)}`
        }
    }
    
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

    const getCreator = (createdBy:any)=> {
        return new Promise<void>(()=> {
            axios.get(`/api/v1/users/${createdBy}`, config)
            .then(({data})=> {
                console.log(data.user);
                setCreator(data.user);
            })
            .catch((error)=> console.error(error));
        });
    }

    useEffect(()=> {
        getCreator(createdBy);
    }, []);

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
                <div className={styles.assignee}> { `${creator.firstname} ${creator.lastname}` } </div>
            </div>

            <div className={styles.desc}> { desc } </div>
            
            <div className={styles.action}>
                { 
                    (comments.length === 0) 
                    ?   <div className={styles.no_comment}> No Comments </div>
                    :   <div className={styles.comments}>
                            <BiCommentDetail className={styles.comment_icon} />
                            <div className={styles.digit}> { comments.length } </div>
                        </div>
                } 
                <div className={styles.teamlist_wrapper}>
                    <MiniTeamList team={team} />
                </div>
            </div>
        </div>
    );
}