import { NextApiResponse } from "next"
import Request from "../../../../../utils/Request"
import { validateToken } from "../../../../../middlewares/jwt"
import { ProjectModel } from "../../../../../models"

export default validateToken((req:Request, res:NextApiResponse)=> {
    if(req.method !== 'POST') return res.status(405).send({ message: 'only POST request allowed'});

    ProjectModel.findOneAndUpdate(
        { id: req.query.projectId, "tasks._id": req.body.taskId },
        { 
            $push: { 
                "tasks.$.comments": {
                    content: req.body.comment,
                    createdBy: req.user._id.toString()
                } 
            }
        },
        { new: true }
    )
    .then((updatedProject)=> {
        const updatedTask = updatedProject.tasks.filter((task:any)=> task._id.toString() === req.body.taskId)
        return res.status(200).send({ message: "New Task comment successfully added", updatedTask: updatedTask[0] });
    })
    .catch((error)=> {
        console.error('There was an error updating project task comment', error);
        return res.status(500).send({ message: 'There was a server error, try again', error: error });
    });
})