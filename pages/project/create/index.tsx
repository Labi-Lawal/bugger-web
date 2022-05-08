import styles from "./create.module.css";
import InputField from "../../../components/InputField";
import TextField from "../../../components/TextField";
import TextButton from "../../../components/Buttons/TextButton";
import AppHeader from "../../../components/Header";

export default function Create(props:any) {
    
    const preventFormDefault = (e:any)=> e.preventDefault;

    return(
        <section>
            {/* HEADER */}
            <AppHeader />

            {/* New project form */}

            <form className={styles.form} onSubmit={(e)=>preventFormDefault(e)}> 
                <div className={styles.head}>Create New Project</div>
                <div className={styles.body}>

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

                        />
                    </div>
                </div>
            </form>
        </section>
    );
};