import { validateToken } from "../../../../../middlewares/jwt";
import Request from "../../../../../utils/Request";
import { NextApiResponse } from "next";
import { ProjectModel } from "../../../../../models";

export default validateToken(function deleteTask(req:Request, res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).send({ message: 'Only DELETE request allowed' });

    ProjectModel.findOneAndUpdate(
        { _id: req.query.projectId },
        { $pull: { 'tasks.$._id': req.body.taskId  } },
        { new: true }
    ).then((updatedProject:any)=> {
        console.log('Task deleted successfully');
        return res.status(400).send({ message: "Task deleted successfully", project: updatedProject });
    })
    .catch((error)=> {
        console.error('There was an error deleting task ', error);
        return res.status(500).send({ message: "There was a server error, try again" });
    });
});