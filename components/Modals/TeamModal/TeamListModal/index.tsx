import UserProfile from "../../../UserProfile";
import styles from "./teamlistmodal.module.css";

export default function TeamListModal (props:any) {

    const { members, projectCreator, deleteUser } = props;



    return (
        <div className={styles.container}>
            <div className={styles.heading}>Team Members</div>
            <div className={styles.add_team_form}>
                {/*
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
                */}
            </div>
            <div className={styles.list_of_team_members}>
                {
                    members.map((member:any, count:any)=> {
                        return  <div key={member._id} className={styles.member}>
                                    <UserProfile projectCreator={projectCreator} firstname={member.firstname} lastname={member.lastname} email={member.email} userId={member._id} showDetails={true} showEmail={true} onUserDelete={(userId:any)=> deleteUser(userId)} />
                                </div>
                    })
                }
            </div>
        </div>
    );

}