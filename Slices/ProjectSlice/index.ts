import { createSlice  } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import axios from "axios"

export const ProjectSlice = createSlice({
    name: "project",
    initialState: {
        projectData: {}
    },
    reducers: {
        fetchProjectData: (state, action)=> {
            new Promise(async (resolve, reject)=> {
                const config = { headers: { 'Authorization': `Bearer ${action.payload.userToken}` } }
                await axios.get(`/api/v1/projects/${ action.payload.projectId }`, config)
                .then((response)=> {
                    state.projectData = response.data.project;
                    
                    console.log(response);
                    console.log(state.projectData);

                    resolve(response.data);
                })
                .catch((error)=> {
                    reject(error.response);
                });
            });
        } 
    }
});

export const { fetchProjectData } = ProjectSlice.actions;
export default ProjectSlice;


