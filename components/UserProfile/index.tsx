import styles from "./userprofile.module.css"
import Image from "next/image";

export default function UserProfile (props:any) {

    const { showDetails, firstname, lastname, imageURL } = props;

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
                ? <div className={styles.username}>User Name</div>
                : null
            }
        </div>
    );
}