import styles from "./teammodal.module.css";
import TeamListModal from "./TeamListModal";
import AddTeamModal from "./AddTeamModal";
import axios from "axios";
import { useSelector } from "react-redux";

export default function TeamModal(props:any) {

    const { projectId, projectCreator, listTeam, addMem, members, resetProject } = props;

    const config = {
        headers: {
            'Authorization': `Bearer ${useSelector((state:any)=> state.user.token)}`
        }
    }

    const deleteUserFromTeam = (userId:any)=> {
        const payload = { userId }

        axios.post(`/api/v1/projects/${projectId}/deleteteam`, payload, config)
        .then(({ data })=> {
            resetProject(data.project)
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.layer} onClick={()=> props.closeModal()}></div>
            {
                (listTeam)
                ?   <div className={styles.add_team_modal_wrapper}>
                        <TeamListModal members={ members } projectCreator={projectCreator} deleteUser={(userId:any)=> deleteUserFromTeam(userId)} /> 
                    </div>
                : (addMem)   
                    ?   <div className={styles.add_team_modal_wrapper} >
                            <AddTeamModal projectId={projectId} onSuccess={(updatedProjectData:any)=> resetProject(updatedProjectData)} />
                        </div>
                    : null
            }
        </div>
    );
} 