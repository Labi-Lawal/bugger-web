import { NextApiResponse } from "next"
import Request from "../../../../../utils/Request"
import { validateToken } from "../../../../../middlewares/jwt"
import { ProjectModel } from "../../../../../models"

export default validateToken(function UpdateTask(req:Request, res:NextApiResponse) {
    if(req.method !== 'PATCH') return res.status(405).send({ message: 'only PATCH request allowed'});

    ProjectModel.findOneAndUpdate(
        { _id: req.query.projectId, "tasks._id": req.body._id },
        { $set: { "tasks.$.status": req.body.status } },
        { new: true }
    )
    .then((updatedProject)=> {
        const uncompletedTasks:any = updatedProject.tasks.filter((task:any)=> task.status !== 'completed');
        
        if(uncompletedTasks.length > 0) {
            if(updatedProject.status === 'completed') {
                ProjectModel.findByIdAndUpdate(
                    {_id: updatedProject.id},
                    { $set: { status: 'ongoing' } },
                    { new: true } 
                )
                .then((updatedProject)=> {
                    return res.status(200).send({ message: "Task successfully updated", project: updatedProject });
                })
                .catch((error)=> {
                    console.error('There was an error updating the project status to ongoing', error);
                    return res.status(500).send({ message: 'There was a server error, try again', error });
                });
            }
            return res.status(200).send({ message: "Task successfully updated", project: updatedProject });
        }
        else {
            ProjectModel.findByIdAndUpdate(
                {_id: updatedProject.id},
                { $set: { status: 'completed' } },
                { new: true } 
            )
            .then((completedProj)=> {
                return res.status(200).send({ message: "Task successfully updated & project has been completed", project: completedProj});
            })
            .catch((error)=> {
                console.error('There was an error updating the project status to completed', error);
                return res.status(500).send({ message: 'There was a server error, try again', error });
            });
        }
    })
    .catch((error)=> {
        console.error('There was an error updating project task', error);
        return res.status(500).send({ message: 'There was a server error, try again', error });
    });
})