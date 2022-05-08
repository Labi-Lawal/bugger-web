import { createRef, RefObject, useState } from "react";
import SideBar from "../../../components/SideBar";
import BugCard from "../../../components/Cards/BugCard"
import { TeamList } from "../../../components/Lists/TeamList";
import TextButton from "../../../components/Buttons/TextButton";
import CreateTask from "../../../components/Modals/CreateTask";
import IconButton from "../../../components/Buttons/IconButton";
import { FaPlus } from "react-icons/fa";
import styles from "./board.module.css";

export default function Board (props:any) {


    const { projectTitle, projectDesc } = props;
    const [ createTaskDialog, setDialog ] = useState(false),
    toggleCreateTaskDialog = ()=> setDialog(!createTaskDialog),
    todoColumnRef: RefObject<HTMLDivElement> = createRef(),
    inProgressColumnRef: RefObject<HTMLDivElement> = createRef(),
    inReviewColumnRef: RefObject<HTMLDivElement> = createRef(),
    completedColumnRef: RefObject<HTMLDivElement> = createRef();

    const [tasksTodo, setToDo] = useState([
        {
            title: 'This is task 5',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'todo',
            dateCreated: '25/04/2022'
        },
        {
            title: 'This is task 4',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'todo',
            dateCreated: '25/04/2022'
        },
        {
            title: 'This is task 3',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'todo',
            dateCreated: '25/04/2022'
        },
        {
            title: 'This is task 2',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'todo',
            dateCreated: '25/04/2022'
        },
        {
            title: 'This is task 1',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'todo',
            dateCreated: '25/04/2022'
        }
    ]),
    [tasksInProgress, setProgress] = useState([
        {
            title: 'This is task in progress 2',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'in-progress',
            dateCreated: '25/04/2022'
        },
        {
            title: 'This is task in progress 1',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'in-progress',
            dateCreated: '25/04/2022'
        }
    ]),
    [tasksInReview, setReview] = useState([
        {
            title: 'This is a task in review 2',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'in-review',
            dateCreated: '25/04/2022'
        },
        {
            title: 'This is a task in review 1',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'in-review',
            dateCreated: '25/04/2022'
        }
    ]),
    [tasksCompleted, setCompleted] = useState([
        {
            title: 'This is a completed task 2',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'completed',
            dateCreated: '25/04/2022'
        },
        {
            title: 'This is a completed task 1',
            desc: 'A. Lorem ipsum dolor sit amet consectetur adipiscing elit vel ultricies porttitor aptent mi odio, praesent malesuada cursus faucibus volutpat nostra nullam justo vestibulum arcu enim.',
            status: 'completed',
            dateCreated: '25/04/2022'
        }
    ]),
    [taskItem, setTaskItem] = useState<any>({}),
    [taskItemMeta, setTaskItemMeta] = useState({ status:'', id:'' });


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

        if(status === 'todo') {
            // get task item and save it
            const updatedTasksTodo = [...tasksTodo];
            setTaskItem(updatedTasksTodo[id]);
        };
        if(status === 'in-progress') {
            const updatedTasksInProgress = [...tasksInProgress];
            setTaskItem(updatedTasksInProgress[id]);
        }
        if(status === 'in-review') {
            const updatedTasksInReview = [...tasksInReview];
            setTaskItem(updatedTasksInReview[id]);
        }
        if(status === 'completed') {
            const updatedTasksCompleted = [...tasksCompleted];
            setTaskItem(updatedTasksCompleted[id]);
        }
    }

    const dragTaskTo = (e:any, status:any, id:any)=> {
        
        console.log(taskItem);

        if(e.clientX >= completedColumnRef.current!.offsetLeft) {
            if(taskItemMeta.status != 'completed') {
                const updatedTaskItem = taskItem;

                updatedTaskItem.status = 'completed';
                setTaskItem(updatedTaskItem);

                const updatedTasksCompleted = [...tasksCompleted];
                updatedTasksCompleted.unshift(taskItem);
                setCompleted(updatedTasksCompleted);

                console.log(taskItemMeta);

                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);
            }

        } else if(e.clientX >= inReviewColumnRef.current!.offsetLeft) {
            if(taskItemMeta.status != 'in-review') {
                const updatedTasksInReview = [...tasksInReview];
                updatedTasksInReview.unshift(taskItem);
                setReview(updatedTasksInReview);

                const updatedTaskItem = taskItem;
                updatedTaskItem.status = 'in-review';
                setTaskItem(updatedTaskItem);

                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);
            }

        } else if(e.clientX >= inProgressColumnRef.current!.offsetLeft) {
            if(taskItemMeta.status != 'in-progress') {
                const updatedTasksInProgress = [...tasksInProgress];
                updatedTasksInProgress.unshift(taskItem);
                setProgress(updatedTasksInProgress);

                const updatedTaskItem = taskItem;
                updatedTaskItem.status = 'in-progress';
                setTaskItem(updatedTaskItem);

                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);
            }
        } else {
            if(taskItemMeta.status != 'todo') {

                const updatedTaskItem = taskItem;
                updatedTaskItem.status = 'todo';
                setTaskItem(updatedTaskItem);

                const updatedTasksTodo = [...tasksTodo];
                updatedTasksTodo.unshift(taskItem);
                setToDo(updatedTasksTodo);

                clearTaskFromSource(taskItemMeta.status, taskItemMeta.id);
            }
        }
    }

    return (
        <section className={styles.board_section}>
            
            <aside className={styles.sidebar_wrapper}>
                <SideBar />
            </aside>

            <div className={styles.board_body}>
                <div className={styles.project_head}> 
                    <div className={styles.project_title}> 
                        <div className={styles.status}>
                            <div className={styles.ongoing_icon}></div>
                            <div className={styles.label}>Ongoing</div>
                        </div>
                        <div className={styles.title}> Project Title </div>
                    </div>

                    <div className={styles.project_desc}> { projectDesc } </div>

                    {/* TODO: TEAM LIST BOX COMPONENT */}
                    <div className={styles.team_wrapper}>
                        <div className={styles.team_list_heading}>Team</div>
                        <div className={styles.list}>
                            <TeamList />
                            <div className={styles.add_team_button_wrapper}>
                                <TextButton label="Add Team" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bug_table} >
                    <div className={styles.column} ref={todoColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> ToDo </div>
                            <div className={styles.count}> 33 </div>
                            
                            <div className={styles.create_task_button_wrapper} >
                                <IconButton icon={FaPlus} onClick={ toggleCreateTaskDialog } />
                            </div>
                        </div>
                        <div className={styles.body}>
                            {
                                tasksTodo.map((task:any, index)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={index}
                                            >
                                                <BugCard
                                                    id={index} 
                                                    title={task.title}
                                                    desc={task.desc}
                                                    date={task.date}
                                                    status={task.status}
                                                    createdBy={task.createdBy}
                                                    team={task.team}
                                                    draggable={true}
                                                    dragStart={saveTaskItem}
                                                    dragEnd={dragTaskTo}
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.column} ref={inProgressColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> In Progess </div>
                            <div className={styles.count}> 33 </div>
                            {/* <div className={styles.icon_btn_wrapper}>+</div> */}
                        </div>
                         <div className={styles.body} >
                            {
                                tasksInProgress.map((task:any, index)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={index}
                                            >
                                                <BugCard
                                                    id={index} 
                                                    title={task.title}
                                                    desc={task.desc}
                                                    date={task.date}
                                                    status={task.status}
                                                    createdBy={task.createdBy}
                                                    team={task.team}
                                                    draggable={true}
                                                    dragStart={saveTaskItem}
                                                    dragEnd={dragTaskTo}
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.column} ref={inReviewColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> In Review </div>
                            <div className={styles.count}> 33 </div>
                            {/* <div className={styles.icon_btn_wrapper}>+</div> */}
                        </div>
                        <div className={styles.body}>
                            {
                                tasksInReview.map((task:any, index:number)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={index}
                                            >
                                                <BugCard
                                                    id={index} 
                                                    title={task.title}
                                                    desc={task.desc}
                                                    date={task.date}
                                                    status={task.status}
                                                    createdBy={task.createdBy}
                                                    team={task.team}
                                                    draggable={true}
                                                    dragStart={saveTaskItem}
                                                    dragEnd={dragTaskTo}
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.column} ref={completedColumnRef}>
                        <div className={styles.heading}>
                            <div className={styles.title}> Completed </div>
                            <div className={styles.count}> 33 </div>
                            {/* <div className={styles.icon_btn_wrapper}>+</div> */}
                        </div>
                        <div className={styles.body}>
                            {
                                tasksCompleted.map((task:any, index)=> {
                                    return  <div
                                                className={styles.bugcard_wrapper}
                                                key={index}
                                            >
                                                <BugCard
                                                    id={index} 
                                                    title={task.title}
                                                    desc={task.desc}
                                                    date={task.date}
                                                    status={task.status}
                                                    createdBy={task.createdBy}
                                                    team={task.team}
                                                    draggable={true}
                                                    dragStart={saveTaskItem}
                                                    dragEnd={dragTaskTo}
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            { (createTaskDialog) ? <CreateTask closeModal={ toggleCreateTaskDialog } /> : null }

        </section>
    );
}