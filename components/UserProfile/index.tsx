import styles from "./userprofile.module.css"
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import IconButton from "../Buttons/IconButton";
import { useSelector } from "react-redux";

export default function UserProfile (props:any) {

    const { projectCreator, showDetails, userId, firstname, lastname, email, imageURL, onUserDelete } = props;

    return (
        <div className={styles.container}>
            {
                (!imageURL)
                ?   <div className={styles.initials}>
                        {firstname.split('')[0] + lastname.split('')[0]}
                    </div>
                :   <div className={styles.image_wrapper}>
                        <Image 
                            src={imageURL} 
                            className={styles.image}
                            layout="fill"
                        />
                    </div>
            }
            {
                (showDetails) 
                ?   <div className={styles.user_details}>
                        <div className={styles.username}>
                            { firstname } { lastname }
                        </div>
                        
                        {
                            (email) 
                            ?   <div className={styles.email}>
                                    ({ email })
                                </div>
                            :null
                        }
                    </div>
                : null
            }
            {
                (showDetails && email)
                ? (projectCreator !== userId)
                    ?   <div className={styles.delete_user_icon}>
                            <IconButton icon={ FaTrash } onclick={()=> onUserDelete(userId)} />
                        </div>
                    :   <div className={styles.delete_user_icon}>Me</div>
                : null
            }
        </div>
    );
}