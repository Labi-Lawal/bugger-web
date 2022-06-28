import { createRef, RefObject, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SideBar from "../../../components/SideBar";
import BugCard from "../../../components/Cards/TaskCard"
import { TeamList } from "../../../components/Lists/TeamList";
import TextButton from "../../../components/Buttons/TextButton";
import CreateTask from "../../../components/Modals/CreateTask";
import IconButton from "../../../components/Buttons/IconButton";
import TeamModal from "../../../components/Modals/TeamModal";
import { FaCheck, FaPlus } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { CgMenu } from "react-icons/cg"
import styles from "./board.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import TaskBoard from "../../../components/TaskBoard";
import SwingingDotsLoader from "../../../components/Loader/SwingingDotsLoader";
import CircularProgressLoader from "../../../components/Loader/CircularProgressLoader";

export default function Board (props:any) {

    const router = useRouter();
    const config = { headers: { 'Authorization': `Bearer ${useSelector((state:any) => state.user.token)}` } }

    const [projectData, setProjectData]:any = useState({
        title: '',
        desc: '',
        status: '',
        team: [],
        createdBy: ''
    });
    const [isProjStatLoading, setIsProjStatLoading] = useState(false);

    const [projectTeamList, setProjectTeamList]:any = useState([]);
    const [sideBarNav, setSideBarNav]:any = useState([]);

    const [teamModalDialog, setTeamModalDialog] = useState(false);
    const [teamListDialog, setTeamListDialog] = useState(false);
    const [addToTeamDialog, setAddToTeamDialog] = useState(false);
    
    const [taskBoardToggle, setTaskBoardToggle] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    const [ createTaskDialog, setDialog ] = useState(false),
    toggleCreateTaskDialog = ()=> setDialog(!createTaskDialog),
    todoColumnRef: RefObject<HTMLDivElement> = createRef(),
    inProgressColumnRef: RefObject<HTMLDivElement> = createRef(),
    inReviewColumnRef: RefObject<HTMLDivElement> = createRef(),
    completedColumnRef: RefObject<HTMLDivElement> = createRef();

    const [tasksTodo, setToDo]:any = useState([]),
    [tasksInProgress, setProgress]:any = useState([]),
    [tasksInReview, setReview]:any = useState([]),
    [tasksCompleted, setCompleted]:any = useState([]),
    [taskItem, setTaskItem] = useState<any>({}),
    [taskItemMeta, setTaskItemMeta] = useState({ status:'', id:'' });

    const openTaskBoard = (task:any)=> {
        setCurrentTask({...task});
        setTaskBoardToggle(true);   
    }

    const setNewProjectData = (newProject:any)=> {
        setTeamModalDialog(false);
        getProjectTeamData(newProject.team)
    }

    const showTeamListModal = ()=> {
        setTeamModalDialog(true);
        setAddToTeamDialog(false)
        setTeamListDialog(true)
    }

    const showAddToTeamModal = ()=> {
        setTeamModalDialog(true)
        setTeamListDialog(false)
        setAddToTeamDialog(true)
    }

    const clearTaskFromSource = (status:any, id:any)=> { 
        if(status === 'todo') {
            const updatedTasksTodo = [...tasksTodo];
            updatedTasksTodo.splice(id, 1);
            setToDo(updatedTasksTodo);
        };
        if(status === 'in-progress') {
            const updatedTasksInProgress = [...tasksInProgress];
            updatedTasksInProgress.splice(id, 1);
            setProgress(updatedTasksInProgress);
        }
        if(status === 'in-review') {
            const updatedTasksInReview = [...tasksInReview];
            updatedTasksInReview.splice(id, 1);
            setReview(updatedTasksInReview);
        }
        if(status === 'completed') {
            const updatedTasksCompleted = [...tasksCompleted];
            updatedTasksCompleted.splice(id, 1);
            setCompleted(updatedTasksCompleted);
        }
    }

    const saveTaskItem = (status:string, id:any)=> {
        
        //store task item status and id for easy clearance later 
        setTaskItemMeta({status, id});

        // get task item and save it
        if(status === 'todo') setTaskItem(tasksTodo[id]);
        if(status === 'in-progress') setTaskItem(tasksInProgress[id]);
        if(status === 'in-review') setTaskItem(tasksInReview[id]);
        if(status === 'completed') setTaskItem(tasksCompleted[id]);
    }

    const dragTaskTo = (e:any, status:any, id:any)=> {

        if(e.clientX >= completedColumnRef.current!.offsetLeft) {
            // If task card was dragged into the completed boundary,
            // transfer the task data to the completed task array
            if(taskItemMeta.status != 'completed') {
                
                // Change the status of the task item in store
                const updatedTaskItem = taskItem;
                updatedTaskItem.status = 'completed';
                setTaskItem(updatedTaskItem);

                // Add stored task item to the start of the array of completed tasks
                const updatedTasksCompleted:any = [...tasksCompleted];
                updatedTasksCompleted.unshift(taskItem);
                setCompleted(updatedTasksCompleted);

                // Remove task from it's source status' group 
                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);

                // Update task in db
                updateTaskItemInDB(updatedTaskItem);
            }

        } else if(e.clientX >= inReviewColumnRef.current!.offsetLeft) {
            
            // If task card was dragged into the inreview boundary,
            // transfer the task data to the inreview task array

            if(taskItemMeta.status != 'in-review') {
                // Change the status of the task item in store
                const updatedTasksInReview:any = [...tasksInReview];
                updatedTasksInReview.unshift(taskItem);
                setReview(updatedTasksInReview);

                // Add stored task item to the start of the array of in-review tasks
                const updatedTaskItem = taskItem;
                updatedTaskItem.status = 'in-review';
                setTaskItem(updatedTaskItem);

                // Remove task from it's source status' group 
                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);

                // Update task in db
                updateTaskItemInDB(updatedTaskItem);
            }

        } else if(e.clientX >= inProgressColumnRef.current!.offsetLeft) {
            
            // If task card was dragged into the inprogress boundary,
            // transfer the task data to the inprogress task array
            if(taskItemMeta.status != 'in-progress') {
                // Change the status of the task item in store
                const updatedTasksInProgress:any = [...tasksInProgress];
                updatedTasksInProgress.unshift(taskItem);
                setProgress(updatedTasksInProgress);

                // Add stored task item to the start of the array of in-review tasks
                const updatedTaskItem = taskItem;
                updatedTaskItem.status = 'in-progress';
                setTaskItem(updatedTaskItem);

                // Remove task from it's source status' group 
                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);

                // Update task in db
                updateTaskItemInDB(updatedTaskItem);
            }
        } else {

            // If task card was dragged into the todo boundary,
            // transfer the task data to the todo task array
            if(taskItemMeta.status != 'todo') {

                const updatedTaskItem = taskItem;
                updatedTaskItem.status = 'todo';
                setTaskItem(updatedTaskItem);

                const updatedTasksTodo:any = [...tasksTodo];
                updatedTasksTodo.unshift(taskItem);
                setToDo(updatedTasksTodo);

                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);

                // Update task in db
                updateTaskItemInDB(updatedTaskItem);
            }
        }
    }

    const updateTaskItemInDB = (taskItem:any)=> {
        const payload = taskItem;

        setIsProjStatLoading(true);
        axios.patch(`/api/v1/projects/${router.query.projectId}/updatetask`, payload, config)
        .then(({ data })=> { 
            console.log(data)
            setProjectData({...data.project});
            setIsProjStatLoading(false);
        })
        .catch((error)=> setIsProjStatLoading(false));
    }

    // GET USER DATA
    const getUserData = ()=>{
        return new Promise(async (resolve)=> {
            await axios.get(`/api/v1/users/me`, config)
            .then((response:any)=> resolve(response.data.user.projects.assigned))
            .catch((error)=> console.error('There was an error fetching', error.response))
        });
    }

    const getAllProjectDets = (projects:any)=> {
        return new Promise<void>(async (resolve)=> {
            const allProjectDets:any = [];

            for await (var project of projects ) {
                await axios.get(`/api/v1/projects/${project}`, config)
                .then(({ data })=> {
                    allProjectDets.push({
                        id: project,
                        label: data.project.title,
                        isActive: (project === router.query.projectId) ?true :false
                    });
                    if(project === projects[projects.length-1]) {
                        setSideBarNav(allProjectDets);
                        resolve();
                    }
                })
                .catch((error)=> console.error(error))
            }
        })
    }

    const getProjectDets = ()=> {
        return new Promise(async (resolve)=> {
            await axios.get(`/api/v1/projects/${router.query.projectId}`, config)
            .then(({data})=> { 
                setProjectData(data.project)
                resolve(data.project);
            })
            .catch((error)=> console.error(error));
        })
    }

    const sortProjectTasks = (tasks:any)=> {
        return new Promise(async ()=> {
            setToDo([...tasksTodo.splice(0, tasksTodo.length)]);
            setProgress([...tasksInProgress.splice(0, tasksInProgress.length)]);
            setReview([...tasksInReview.splice(0, tasksTodo.length)]);
            setCompleted([...tasksCompleted.splice(0, tasksTodo.length)]);

            tasks.forEach((task:any)=> {
                if(task.status === 'todo') {
                    if(!tasksTodo.includes(task)) tasksTodo.unshift(task);
                    setToDo([...tasksTodo]);
                }
                if(task.status === 'in-progress') {
                    if(!tasksTodo.includes(task)) tasksInProgress.unshift(task);
                    setProgress([...tasksInProgress]);
                }
                if(task.status === 'in-review') {
                    if(!tasksTodo.includes(task)) tasksInReview.unshift(task);
                    setReview([...tasksInReview]);
                }
                if(task.status === 'completed') {
                    if(!tasksTodo.includes(task)) tasksCompleted.unshift(task);
                    setCompleted([...tasksCompleted]);
                }
            });
        })
    }

    const setNewProjectTasks = (tasks:any)=> {
        sortProjectTasks(tasks);
        toggleCreateTaskDialog();
    }

    const getProjectTeamData = async (team:any)=> {
        projectTeamList.splice(0, projectTeamList.length)

        for(var i=0; i<team.length; i++) {
            await axios.get(`/api/v1/users/${team[i]}`, config)
            .then(({ data })=> {    
                if(!projectTeamList.includes(data.user)) projectTeamList.push(data.user);
                if(team[i] === team[team.length-1]) setProjectTeamList([...projectTeamList])
            })
        }
    }

    const deleteTaskFromDB = (taskId:any)=> {
        const payload = { taskId }
        axios.post(`/api/v1/projects/${router.query.projectId}/deletetask`, payload, config)
        .then(({data})=> {
            console.log('Task has been deleted successfully');
            setProjectData(data.project);
        })
        .catch((error)=> {
            console.error('There was an error deleting task', error);
        });
    }

    useEffect(()=> { 
        if(!router.isReady) return;

        getUserData()
        .then((projects:any)=> {
            getAllProjectDets(projects)
            .then(()=> {
                getProjectDets()
                .then(async (project:any)=> {
                    await getProjectTeamData(project.team)
                    sortProjectTasks(project.tasks);
                })
            })
        });

    }, [router.isReady]);


    return (
        <section className={styles.board_section}>
            
            <aside className={styles.sidebar_wrapper}>
                <SideBar allNavs={[...sideBarNav]} currentNavPosition={0} />
            </aside>

            <div className={styles.board_body}>
                <div className={styles.project_head}> 
                    <div className={styles.project_title}> 
                        {   
                            (isProjStatLoading) 
                            ?   <div className={styles.loader}>
                                    <CircularProgressLoader />
                                </div>
                            :   (projectData.status === 'ongoing')  ?
                                    <div className={styles.status}>
                                        <div className={styles.ongoing_icon}></div>
                                        <div className={styles.label}>Ongoing</div>
                                    </div>
                                    :
                                    <div className={styles.status}>
                                        <FaCheck className={styles.completed_icon} />
                                        <div className={styles.label}>Completed</div>
                                    </div>
                        }
                        <div className={styles.title}> { projectData.title } </div>
                    </div>

                    <div className={styles.project_desc}>  </div>

                    {/* TODO: TEAM LIST BOX COMPONENT */}
                    <div className={styles.team_wrapper}>
                        <div className={styles.team_list_heading}>Team</div>
                        <div className={styles.list}>
                            <TeamList team={projectTeamList} />
                            
                            <div className={styles.team_action_wrapper}>
                                <div className={styles.add_team_button_wrapper}>
                                    <IconButton icon={CgMenu} onclick={ ()=> showTeamListModal() } title="Open List" />
                                </div>
                                <div className={styles.add_team_button_wrapper}>
                                    <IconButton icon={AiOutlineUsergroupAdd} onclick={ ()=> showAddToTeamModal() } title="Add Team" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bug_table} >
                    <div className={styles.column} ref={todoColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> ToDo </div>
                            <div className={styles.count}> { tasksTodo.length } </div>
                            
                            <div className={styles.create_task_button_wrapper} >
                                <IconButton icon={FaPlus} onclick={ toggleCreateTaskDialog } />
                            </div>
                        </div>
                        <div className={styles.body}>
                            {
                                tasksTodo.map((task:any, index:number)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={task._id}
                                            >
                                                <BugCard
                                                    id={index} 
                                                    title={task.title}
                                                    desc={task.desc}
                                                    project={task}
                                                    date={task.dateCreated}
                                                    status={task.status}
                                                    createdBy={task.createdBy}
                                                    team={task.team}
                                                    comments={task.comments}
                                                    draggable={true}
                                                    dragStart={saveTaskItem}
                                                    dragEnd={dragTaskTo}
                                                    openTask={ ()=> openTaskBoard(task) }
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.column} ref={inProgressColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> In Progess </div>
                            <div className={styles.count}> { tasksInProgress.length } </div>
                            {/* <div className={styles.icon_btn_wrapper}>+</div> */}
                        </div>
                         <div className={styles.body} >
                            {
                                tasksInProgress.map((task:any, index:number)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={task._id}
                                            >
                                                <BugCard
                                                   id={index} 
                                                   title={task.title}
                                                   desc={task.desc}
                                                   date={task.dateCreated}
                                                   status={task.status}
                                                   createdBy={task.createdBy}
                                                   team={task.team}
                                                   comments={task.comments}
                                                   draggable={true}
                                                   dragStart={saveTaskItem}
                                                   dragEnd={dragTaskTo}
                                                   openTask={ ()=> openTaskBoard(task) }
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.column} ref={inReviewColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> In Review </div>
                            <div className={styles.count}> { tasksInReview.length } </div>
                            {/* <div className={styles.icon_btn_wrapper}>+</div> */}
                        </div>
                        <div className={styles.body}>
                            {
                                tasksInReview.map((task:any, index:number)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={task._id}
                                            >
                                                <BugCard
                                                    id={index} 
                                                    title={task.title}
                                                    desc={task.desc}
                                                    date={task.dateCreated}
                                                    status={task.status}
                                                    createdBy={task.createdBy}
                                                    team={task.team}
                                                    comments={task.comments}
                                                    draggable={true}
                                                    dragStart={saveTaskItem}
                                                    dragEnd={dragTaskTo}
                                                    openTask={ ()=> openTaskBoard(task) }
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.column} ref={completedColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> Completed </div>
                            <div className={styles.count}> { tasksCompleted.length } </div>
                            {/* <div className={styles.icon_btn_wrapper}>+</div> */}
                        </div>
                        <div className={styles.body}>
                            {
                                tasksCompleted.map((task:any, index:number)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={task._id}
                                            >
                                                <BugCard
                                                   id={index}
                                                   taskId={task._id} 
                                                   title={task.title}
                                                   desc={task.desc}
                                                   date={task.dateCreated}
                                                   status={task.status}
                                                   createdBy={task.createdBy}
                                                   team={task.team}
                                                   comments={task.comments}
                                                   draggable={true}
                                                   dragStart={saveTaskItem}
                                                   dragEnd={dragTaskTo}
                                                   openTask={ ()=> openTaskBoard(task) }
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            { (createTaskDialog) ? <CreateTask projectId={ router.query.projectId } updateProjectData={(newData:any)=> setNewProjectTasks(newData.tasks) } closeModal={ toggleCreateTaskDialog } /> : null }
            { (teamModalDialog) ? <TeamModal projectCreator={projectData.createdBy} listTeam={teamListDialog} addMem={addToTeamDialog} projectId={ router.query.projectId } members={ [...projectTeamList] } resetProject={(newProject:any)=> setNewProjectData(newProject) } closeModal={()=> setTeamModalDialog(false)}  /> : null  }
            { (taskBoardToggle) ? <TaskBoard taskData={currentTask} projectData={projectData} projectTeamList={[...projectTeamList]} closeBoard={ ()=> setTaskBoardToggle(false) } /> :null }
        </section>
    );
}