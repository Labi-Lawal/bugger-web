import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import TextButton from "../../../Buttons/TextButton";
import InputField from "../../../InputField";
import styles from "./addteammodal.module.css";

export default function AddTeamModal(props:any) {
    
    const { projectId } = props;

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
        // if(!userExists(model.value)) {
        //     model.error = 'User doesn\'t exist'
        // }

        model.error = '';
        return true;
    }

    const addMember = ()=> {
        const payload = {
            newTeamMem: memEmailModel.value
        }

        console.log(config);

        axios.post(`/api/v1/projects/${projectId}/updateteam`, payload, config)
        .then(({data})=> {
            console.log(data);
            props.addMemToTeam(data.projects);
        })
        .catch((error)=> console.error(error.response));
    }

    return (
        <div className={styles.container}>
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
                    <TextButton label="Add Member" onclick={ ()=> addMember() } />
                </div>
            </div>
        </div>
    );
} 