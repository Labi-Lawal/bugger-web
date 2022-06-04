import InputField from "../../InputField";
import TextButton from "../../Buttons/TextButton";
import TextField from "../../TextField";
import styles from "./createtask.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function createTask(props:any) {

    const { projectId } = props;

    const userState = useSelector((state:any)=> state.user);

    const createTask = (e:any)=> {
        e.preventDefault();
    }

    const [projectTitleModel, setProjectTitleModel] = useState({
        type:'text',
        name: 'project-title',
        value:'',
        error:'', 
        label:'Project Title',
        hint: ''
    }),
    [projectDescModel, setProjectDescModel] = useState({
        type:'text',
        name: 'project-desc',
        value:'',
        error:'', 
        label:'Description',
        hint: ''
    }),
    [isBtnLoading, setIsBtnLoading] = useState(false),

    setInput = (inputItem:any, model:any)=> {
        const updated = {...model};
        updated.value = inputItem;
        if(model.name == 'project-title') {
            validateProjectTitle(updated);
            setProjectTitleModel(updated);
        }
        if(model.name == 'project-desc') { 
            validateProjectDesc(updated)
            setProjectDescModel(updated);
        }
    }
    
    const validateProjectTitle = (updateItem:any)=> {
        if(!updateItem.value) {
            updateItem.error = 'Field cannot be empty'
            return false;
        }

        updateItem.error = ''
        return true;
    }

    const validateProjectDesc = (updateItem:any)=> {
        if(!updateItem.value) {
            updateItem.error = 'Field cannot be empty'
            return false;
        }

        updateItem.error = ''
        return true;
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${useSelector((state:any)=> state.user.token)}`
        }
    }

    const createProjectTask = ()=> {

        console.log(userState);

        if(!validateProjectTitle(projectTitleModel)) {
            setProjectTitleModel({...projectTitleModel});
            return;
        }

        const payload = {
            title: projectTitleModel.value,
            desc: projectDescModel.value
        }

        setIsBtnLoading(true);

        console.log(payload);

        axios.put(`/api/v1/projects/${projectId}/task`, payload, config)
        .then((response)=> { 
            setIsBtnLoading(false);
            console.log(response.data);
        })
        .catch((error)=> {
            setIsBtnLoading(false);
            console.error(error.response);
        });
    }


    return (
        <div className={styles.container}>
            <div className={styles.layer} onClick={()=> props.closeModal() }  ></div>
            <div className={styles.wrapper}>
            
                <div className={styles.title}>Create Task</div>

                <form className={styles.form} onSubmit={ (e)=> e.preventDefault() }>

                    {/* input field component */}
                    <div className={styles.title_field_wrapper}>
                        <InputField 
                            label={ projectTitleModel.label }
                            type={ projectTitleModel.type }
                            name={ projectTitleModel.name }
                            value={ projectTitleModel.value }
                            hint={ projectTitleModel.hint }
                            error={ projectTitleModel.error }
                            onKeyPress={ (input:any)=> setInput(input, projectTitleModel) }
                        />
                    </div>

                    {/* text field component */}
                    <div className={styles.desc_field_wrapper}>
                        <TextField  
                            label={ projectDescModel.label }
                            type={ projectDescModel.type }
                            name={ projectDescModel.name }
                            value={ projectDescModel.value }
                            hint={ projectDescModel.hint }
                            error={ projectDescModel.error }
                            onKeyPress={ (input:any)=> setInput(input, projectDescModel) }
                        />
                    </div>

                    {/* button component */}
                    <div className={styles.submit_button_wrapper}>
                        <TextButton 
                            label="Create"
                            loading={ isBtnLoading }
                            onclick={ createProjectTask }
                        />
                    </div>
                </form>
            </div>
        </div>
    );

}