import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { resolve } from "node:path/win32";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { MdCalendarToday, MdCalendarViewDay, MdCalendarViewMonth, MdOutlineCalendarToday, MdWarning } from "react-icons/md";
import { useSelector } from "react-redux";
import TextButton from "../Buttons/TextButton";
import InputField from "../InputField";
import { MiniTeamList, TeamList } from "../Lists/TeamList";
import UserProfile from "../UserProfile";
import styles from "./taskboard.module.css";

export default function BugDetailBoard(props:any) {

    const { projectData, creator, taskData, closeBoard } = props;

    const config = {
        headers: {
            'Authorization': `Bearer ${useSelector((state:any)=> state.user.token)}`
        }
    }

    const user = useSelector((state:any)=> state.user.userData);

    const [creatorFullname, setCreatorFullName] = useState('');
    const [teamList, setTeamList]:any = useState([]);
    const [currentUser, setCurrentUser]:any = useState({});
    const [newCommentModel, setNewCommentModel] = useState({
        type: 'text',
        label: '',
        placeholder: 'Add a comment',
        value: '',
        error: ''
    });

    const setInput = (inputItem:any, model:any)=> {
        model.value = inputItem;

        if(model.value === '') { 
            model.error = 'Field cannot be empty'
            setNewCommentModel({...model});
            return false;
        }

        model.error = ""
        setNewCommentModel({...model});
    }

    const getCreatorDets = (userId:any)=> {
        return new Promise(async (resolve)=> {
            await axios.get(`/api/v1/users/${userId}`, config)
            .then((response:any)=> resolve(response.data.user))
        });
    }

    const detDate = (date:any)=> {
        const year = date.split("-")[0],
        month = date.split("-")[1],
        day = date.split("-")[2];

        date = new Date(year, month-1, day).toLocaleDateString('en-us', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        return date;
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

    const getCurrentUserDets = ()=> {
        return new Promise(async ()=> {
            await axios.get(`/api/v1/users/me`, config)
            .then(({ data })=> {
                setCurrentUser({...data.user});
            });
        })
    }

    useEffect(()=> {
        getCreatorDets(projectData.createdBy)
        .then((user:any)=> {
            setCreatorFullName(`${user.firstname} ${user.lastname}`);
            getTeamData(taskData.team);
            getCurrentUserDets()
        });
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.overlay} onClick={()=> closeBoard()}>
            </div>
            <div className={styles.detail_board}>
                <div className={styles.head}>
                    <div className={styles.date}>
                        <div className={`${styles.label} ${styles.label_text}`}><MdOutlineCalendarToday className={styles.calendar_icon} />:</div>
                        <div className={styles.data}>{ detDate(projectData.dateCreated.split('T')[0]) }</div>
                    </div>
                    <div className={styles.createdBy}>
                        <div className={`${styles.label} ${styles.label_text}`}>Creator:</div>
                        <div className={styles.data}>{ creatorFullname }</div> 
                    </div>
                    {
                        (teamList.length > 0)
                        ?   <div className={styles.team}>
                                <div className={`${styles.label} ${styles.label_text}`}>Team:</div>
                                <div className={styles.team_list_wrapper}>
                                    <TeamList team={teamList} />
                                </div>
                            </div>
                        :   <div className={styles.warning}> <MdWarning /> No Team Assigned</div>
                    }
                    <div></div>
                </div>

                <div className={styles.body_wrapper}>
                    <div className={styles.title}> { taskData.title } </div>
                    
                    <div className={styles.desc}> 
                        <div className={styles.label}>Description</div>
                        <div className={styles.content}> { taskData.desc } </div>
                    </div>

                    <div className={styles.desc}> 
                        <div className={styles.label}>Comments</div>
                        <div className={styles.comment_section}> 
                            <div className={styles.new_comment}>
                                { (currentUser.firstname) 
                                    ?   <div className={styles.userprofile_wrapper}>
                                            <UserProfile firstname={currentUser.firstname} lastname={currentUser.lastname} /> 
                                        </div>
                                    :null
                                } 
                                <div className={styles.inputfield_wrapper}>
                                    <InputField 
                                        type={newCommentModel.type}
                                        hint={newCommentModel.placeholder}
                                        label={newCommentModel.label}
                                        error={newCommentModel.error}
                                        onKeyPress={(inputItem:any)=> setInput(inputItem, newCommentModel)}
                                    />
                                </div>
                                <div className={styles.comment_btn_wrapper}>
                                    <TextButton label="SEND" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}