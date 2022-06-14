import { NextApiResponse } from "next";
import { validateToken } from "../../../../../middlewares/jwt";
import { ProjectModel } from "../../../../../models";
import Request from "../../../../../utils/Request";

export default validateToken((req:Request, res:NextApiResponse)=> {
    if(req.method !== 'POST') return res.status(405).send({ message: 'Only POST request allowed' });

    console.log(req.query.projectId);

    ProjectModel.findOneAndUpdate(
        { _id: req.query.projectId },
        { 
            $pull: {
                team: req.body.userId
            }
        },
        { new: true }
    )
    .then((updatedProject)=> {
        console.log('A member has been removed from project team', updatedProject);
       return  res.status(200).send({ message:'Member removed successfully', project: updatedProject });
    })
    .catch((error)=> {
        console.error(error);
        return res.status(500).send({ message:'There was a server removing member', error: error });
    });
});