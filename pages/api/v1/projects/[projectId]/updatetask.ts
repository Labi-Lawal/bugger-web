import { NextApiResponse } from "next"
import Request from "../../../../../utils/Request"
import { validateToken } from "../../../../../middlewares/jwt"
import { ProjectModel } from "../../../../../models"

export default validateToken(function UpdateTask(req:Request, res:NextApiResponse) {
    if(req.method !== 'PATCH') return res.status(405).json({ message: 'only PATCH request allowed'});

    ProjectModel.findOneAndUpdate(
        { id: req.query.projectId, "tasks._id": req.body._id },
        { 
            $set: { "tasks.$.status": req.body.status }
        },
        { new: true }
    )
    .then((updatedProject)=> {
        console.log(updatedProject);
        return res.status(200).json({ message: "New Task successfully added", project: updatedProject });
    })
    .catch((error)=> {
        console.error('There was an error updating project task', error);
    });
})