import axios from "axios";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import detDate from "../../../utils/detDate";
import UserProfile from "../../UserProfile";
import styles from "./commentcard.module.css";

export default function CommentCard(props:any) {
    
    const { userId, date, comment } = props;

    const [user, setUser]:any = useState({});


    // const getCommentUser = (userId:any)=> {
    //     return new Promise(()=> {
    //         axios.get(`/api/v1/users/${userId}`)
    //         .then(({data})=> {
                
    //         });
    //     });
    // }

    const config = {
        headers: {
            'Authorization': `Bearer ${useSelector((state:any)=> state.user.token)}`
        }
    }

    useEffect(()=> {
       
        axios.get(`/api/v1/users/${userId}`, config)
        .then(({data})=> {
            console.log(data);
            setUser(data.user);
        });
        
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.meta_data}>
                { (user.firstname) 
                    ?   <div className={styles.userprofile_wrapper}>
                            <UserProfile firstname={user.firstname} lastname={user.lastname} showDetails={true} /> 
                        </div>
                    : null
                }
                <div className={styles.date}> { detDate(date) } </div>
            </div>
            <div className={styles.comment}> { comment } </div>
        </div>
    )
}