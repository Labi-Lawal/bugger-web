import { stringify } from "querystring";
import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import UserProfile from "../../../UserProfile";
import styles from "./addteamtaskmodal.module.css";

export default function AddTeamTaskModal(props:any) {

    const { closeModal, projectTeam, projectCreator } = props;

    const [searchTeamModel, setSearchTeamModel] = useState({
        type: 'text',
        name: 'search-team',
        hint: 'Search user by email',
        value: '',
    });

    const [projectTeamList, setprojectTeamList] = useState(projectTeam);

    const setInput = (inputItem:any, model:any)=> {
        model.value = inputItem;
        setSearchTeamModel({...model});
        filterListByInput(inputItem);
    }

    const filterListByInput = (inputItem:any)=> {
        const filteredProjectTeamList = projectTeam.filter((member:any)=> member.email.search(inputItem));
        console.log(filteredProjectTeamList);
        // setprojectTeamList({...filteredProjectTeamList});
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                Add Member To Task Team
                <FaTimes onClick={ ()=> closeModal() } />
            </div>
            <div className={styles.body}>
                <div className={styles.user_search_field_wrapper}>
                    <FaSearch className={styles.search_icon} />
                    <input 
                        type={searchTeamModel.type}
                        name={searchTeamModel.name}
                        placeholder={searchTeamModel.hint}
                        onKeyDown={(e:any)=> setInput(e.target.value, searchTeamModel)}
                    />
                </div>
            </div>

            <div className={styles.list_of_team_members}>
                {
                    projectTeamList.map((member:any, count:any)=> {
                        return  <div key={member._id+count} className={styles.member} >
                                    <UserProfile projectCreator={projectCreator} firstname={member.firstname} lastname={member.lastname} email={member.email} userId={member._id} showDetails={true} showEmail={true} />
                                    <div className={styles.add_user_btn_wrapper}></div>
                                </div>
                    })
                }
            </div>
        </div>
    );
}