import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import styles from "./bugcard.module.css";
import { MiniTeamList } from "../../Lists/TeamList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function BugCard (props:any) {

    const { id, taskId, title, desc, status, team, date, createdBy, comments, draggable, dragStart, dragEnd, openTask, deleteTask } = props;
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [creator, setCreator]:any = useState({});
    const [teamList, setTeamList]:any = useState([]);


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
                setCreator(data.user);
            })
            .catch((error)=> console.error(error));
        });
    }

    const getTeamData = (team:any)=> {
        return new Promise(async ()=> {
            const teamMembers:any = [];
            
            for await (var teamMem of team) {
                axios.get(`/api/v1/users/${teamMem}`, config)
                .then(({data})=> {
                    teamMembers.push(data.user);
                    if(teamMem === team[team.length-1]) {
                        setTeamList(teamMembers);
                    }
                })
                .catch((error)=> console.error(error))
            }
        })
    }

    useEffect(()=> {
        getCreator(createdBy)
        .then(()=> getTeamData(team));
    }, []);

    

    return (
        <div className={styles.container} draggable={draggable} onDragStart={(e)=> dragStart(status, id)} onDragEnd={(e)=> dragEnd(e)} >
            <div className={styles.top}>
                <div className={styles.title} onClick={()=> openTask()}> { title } </div>
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
            <div className={styles.info_wrapper} onClick={()=> openTask()} >
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
                        { (team.length > 0) ? <MiniTeamList team={team} /> : <div className={styles.no_comment}> No Team </div> }
                    </div>
                </div>
            </div>
        </div>
    );
}