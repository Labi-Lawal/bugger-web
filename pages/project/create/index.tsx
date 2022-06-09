import { useState } from "react";
import styles from "./create.module.css";
import InputField from "../../../components/InputField";
import TextField from "../../../components/TextField";
import TextButton from "../../../components/Buttons/TextButton";
import AppHeader from "../../../components/Header";
import axios from "axios";
import ErrorModal from "../../../components/Modals/ErrorModal";
import { useSelector, useDispatch } from "react-redux";
import { storeUserData } from "../../../Slices/UserSlice";
import { useRouter } from "next/router";
import UserSearchField from "../../../components/UserSearchField";
import UserCard from "../../../components/Cards/UserCard";

export default function Create(props:any) {

    const userState = useSelector((state:any)=> state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const [titleModel, setTitleModel] = useState({
        label: 'Project Title',
        hint: '',
        name: 'title',
        type: 'text',
        value: '',
        error: ''
    }),
    [descModel, setDescModel] = useState({
        label: 'Description',
        hint: '',
        name: 'desc',
        value: '',
        error: ''
    }), 
    [userSearchModel, setUserSearchModel] = useState({
        label: 'Assign Team',
        hint: '',
        name: 'user-search',
        type: 'text',
        value: [],
        tempValue: '',
        error: ''
    }),
    [loadingBtn, setLoadingBtn] = useState(false),
    [errorModel, setErrorModel] = useState({
        message: '',
        errorOccurred: false
    });
    const closeModalFn = ()=> {
        errorModel.errorOccurred = false;
        setErrorModel({...errorModel});
    }

    const preventFormDefault = (e:any)=> e.preventDefault();

    const setInput = (inputItem:any, model:any)=> {
        if(model.name === 'title') {
            model.value = inputItem;
            validateTitle(model);
            setTitleModel({...model});
        }
        if(model.name === 'desc') {
            model.value = inputItem;
            validateDesc(model);
            setDescModel({...model});
        }
        if(model.name === 'user-search') {
            if(model.value.includes(inputItem))  {
                model.error = 'You have already sent an invite to this user';
                setUserSearchModel({...model});
                return false;
            }

            model.value.push(inputItem);
            model.tempValue = inputItem;
            
            validateUserSearch(model);
            setUserSearchModel({...model});
            console.log(model);
        }
    }

    const validateTitle = (updateItem:any)=> {
        if(updateItem.value === '') {
            updateItem.error = 'Field cannot be empty';
            return false;
        }

        updateItem.error = '';
        return true;
    }

    const validateDesc = (updateItem:any)=> {
        if(updateItem.value === '')  {
            updateItem.error = 'Field cannot be empty';
            return false;
        }

        updateItem.error = '';
        return true;
    }

    const validateUserSearch = (updateItem:any)=> {
        if(updateItem.value.length < 1)  {
            updateItem.error = 'Field cannot be empty';
            return false;
        }
        if(updateItem.value.includes())  {
            updateItem.error = 'Field cannot be empty';
            return false;
        }

        updateItem.error = '';
        return true;
    }

    const createProject = ()=> {
        if(!validateTitle(titleModel)) {
            setTitleModel({...titleModel});
            return;
        } 
        if(!validateDesc(descModel)) { 
            setDescModel({...descModel});
            return;
        }
        if(!validateUserSearch(userSearchModel)) {
            setUserSearchModel({...userSearchModel});
            return;
        }

        const payload = {
            title: titleModel.value,
            desc: descModel.value,
            team: userSearchModel.value
        }

        setLoadingBtn(true);


        axios.post('/api/v1/projects/create', payload, {headers: { 'Authorization': `Bearer ${userState.token}`}})
        .then((response)=> {
            setLoadingBtn(false); 
            
            dispatch(storeUserData(response.data.user));
            
            const projectId = response.data.user.projects.recent;
            router.push(`/project/board/${projectId}`);
        })
        .catch((error)=> {
            setLoadingBtn(false);
            console.error(error.response);
            setErrorModel({ message: error.response.data.message, errorOccurred: true });
        });
    }

    return(
        <section>
            {/* HEADER */}
            <AppHeader />

            {/* New project form */}

            <div className={styles.container}>
                <form className={styles.form} onSubmit={(e)=>preventFormDefault(e)}> 
                    <div className={styles.head}>Create New Project</div>
                    <div className={styles.body}>

                    {
                        (errorModel.errorOccurred)
                        ? <ErrorModal message={errorModel.message} onModalClick={closeModalFn} />
                        : ''
                    }

                        {/* input field component */}
                        <div className={styles.title_field_wrapper}>
                            <InputField 
                                label={titleModel.label}
                                hint={titleModel.hint}
                                name={titleModel.name}
                                type={titleModel.type}
                                value={titleModel.value}
                                error={titleModel.error}
                                onKeyPress={ (inputItem:any)=> setInput(inputItem, {...titleModel}) }
                            />
                        </div>

                        {/* text field component */}
                        <div className={styles.desc_field_wrapper}>
                            <TextField 
                                label={descModel.label}
                                hint={descModel.hint}
                                name={descModel.name}
                                value={descModel.value}
                                error={descModel.error}
                                onKeyPress={ (inputItem:any)=> setInput(inputItem, {...descModel}) }
                            />
                        </div>

                        {/* user search field component */}
                        <div className={styles.user_search_field_wrapper}>
                            <UserSearchField
                                label={userSearchModel.label}
                                hint={userSearchModel.hint}
                                name={userSearchModel.name}
                                type={userSearchModel.type}
                                value={userSearchModel.tempValue}
                                error={userSearchModel.error}
                                onButtonClick={ (inputItem:any)=> setInput(inputItem, {...userSearchModel}) }
                            />
                        </div>

                        {/* button component */}
                        <div className={styles.submit_button_wrapper}>
                            <TextButton 
                                label="Create Project"
                                loading={loadingBtn}
                                onclick={ createProject }
                            />
                        </div>
                    </div>
                </form>
                <div className={styles.assignees_section}>
                    <div className={styles.heading}>
                        Assignees
                        <div className={styles.count}>{ userSearchModel.value.length }</div>
                    </div>
                    <div>
                        {
                            userSearchModel.value.map((user, count)=> {
                                return  <div className={styles.assignee} key={count}>
                                            <UserCard email={user} />
                                        </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};