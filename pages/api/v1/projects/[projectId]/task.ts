import { NextApiResponse } from "next"
import { validateToken } from "../../../../../middlewares/jwt"
import Request from "../../../../../utils/Request"
import { ProjectModel } from "../../../../../models"

export default validateToken(function Task(req:Request, res:NextApiResponse) {
    if(req.method !== 'PUT') return res.status(405).send({ message: 'only PUT request allowed'});

    
    const newTask = {
        title: req.body.title,
        desc: req.body.desc,
        createdBy: req.user._id
    }

    ProjectModel.findOneAndUpdate(
        { id: req.query.projectId },
        { 
            $push: { tasks: newTask }
        },
        { new: true }
    )
    .then((updatedProject)=> {
        console.log(updatedProject);
        return res.status(200).send({ message: "New Task successfully added", project: updatedProject });
    })
    .catch((error)=> {
        console.error('There was an error creating new project task', error);
    });
})