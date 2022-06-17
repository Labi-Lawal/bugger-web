import axios from "axios";
import { useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import TextButton from "../../../Buttons/TextButton";
import InputField from "../../../InputField";
import styles from "./addteammodal.module.css";

export default function AddTeamModal(props:any) {
    
    const { projectId, onSuccess } = props;

    const config = {
        headers: {
            'Authorization': `Bearer ${useSelector((state:any)=> state.user.token)}`
        } 
    }
    
    const [memEmailModel, setMemEmailModel] = useState({
        label: 'Member Email',
        name: 'member-email',
        hint: '',
        value: '',
        error: '',
    });
    const [isBtnloading, setisBtnloading] = useState(false);
    const [isMemberSubmitted, setIsMemberSubmitted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const setInput = (inputValue:any, model:any)=> {
        if(model.name === 'member-email') {
            model.value = inputValue;
            validateMemEmailModel(model);
            setMemEmailModel({...model});
        }
    }

    const userExists = (userEmail:any)=> {
        return new Promise((resolve, reject)=> {
            axios.get(`/api/v1/users/${userEmail}`, config)
            .then((response)=> resolve(true))
            .catch((error)=> reject(false));
        })
    }

    const validateMemEmailModel = (model:any)=> {
        if(!model.value) {
            model.error = 'Field cannot be empty';
            return false;
        }

        model.error = '';
        return true;
    }

    const addMember = ()=> {
        if(validateMemEmailModel(memEmailModel)) {
            const payload = {
                newTeamMem: memEmailModel.value
            }

            setisBtnloading(true);

            axios.post(`/api/v1/projects/${projectId}/updateteam`, payload, config)
            .then(({data})=> {
                setisBtnloading(false);
                setIsMemberSubmitted(true);
                setIsSuccess(true);

                onSuccess(data.project);
            })
            .catch((error)=> {
                setisBtnloading(false);

                if(error.response.status === 404) {
                    memEmailModel.error = error.response.data.message;
                }
                if(error.response.status === 409) {
                    memEmailModel.error = error.response.data.message;
                }
            
                setMemEmailModel({...memEmailModel});

                setIsSuccess(false);
            });
        }

        setMemEmailModel({...memEmailModel});
    }

    return (
        <div className={styles.container}>
            {
                (isMemberSubmitted) 
                ?   (isSuccess)  ?  <div className={styles.success_dialog}>
                                        <div className={styles.heading}> <FaTimes className={styles.close_icon} onClick={()=> setIsMemberSubmitted(false)} /> </div>
                                        <div className={styles.icon}> <FaCheckCircle /> </div>
                                        <div className={styles.success_msg}>
                                            New member has been added to team successfully.
                                        </div>
                                    </div>
                        :   null
                :   <div>
                        <div className={styles.heading}>Add New Team Member</div>
                        <div className={styles.add_team_form}>
                            <div className={styles.user_email_input_wrapper}>
                                <InputField 
                                    label={memEmailModel.label}
                                    hint={memEmailModel.hint}
                                    value={memEmailModel.value}
                                    error={memEmailModel.error}
                                    onKeyPress={(inputValue:any)=> setInput(inputValue, memEmailModel)}
                                />
                            </div>
                            <div className={styles.submit_button}>
                                <TextButton label="Add Member" loading={isBtnloading} onclick={ ()=> addMember() } />
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
}   