import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slices/UserSlice";
import ProjectSlice from "../Slices/ProjectSlice";

export default configureStore({
    reducer: { user: userSlice.reducer, project: ProjectSlice.reducer }
});