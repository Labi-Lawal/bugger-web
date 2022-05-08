import InputField from "../../InputField";
import TextButton from "../../Buttons/TextButton";
import TextField from "../../TextField";
import styles from "./createtask.module.css";

export default function createTask(props:any) {

    const createTask = (e:any)=> {
        e.preventDefault();
    }

    return (
        <div className={styles.container}>
            <div className={styles.layer} onClick={()=> props.closeModal() }  ></div>
            <div className={styles.wrapper}>
            
                <div className={styles.title}>Create Task</div>

                <form className={styles.form}>

                    {/* input field component */}
                    <div className={styles.title_field_wrapper}>
                        <InputField 
                            label="Project Title"
                        />
                    </div>

                    {/* text field component */}
                    <div className={styles.desc_field_wrapper}>
                        <TextField  
                            label="Description"
                        />
                    </div>

                    {/* button component */}
                    <div className={styles.submit_button_wrapper}>
                        <TextButton 
                            label="Create"
                            createTask={ createTask }
                        />
                    </div>
                </form>
            </div>
        </div>
    );

}