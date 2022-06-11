import "../../../../../middlewares/database"
import { NextApiResponse } from "next";
import { validateToken } from "../../../../../middlewares/jwt";
import { ProjectModel } from "../../../../../models";
import Request from "../../../../../utils/Request";

export default validateToken(async (req:Request, res:NextApiResponse)=> {
    if(req.method !== 'GET') return res.status(405).send({ message: 'only GET request allowed'});
    
    ProjectModel.findOne({_id: req.query.projectId})
    .then((foundProject)=> {
        if(!foundProject) return res.status(404).send({ message: 'Project doesn\'t exist' });
        return res.status(200).send({ project: foundProject });
    })
    .catch((error)=> {
        console.error('There was an error finding projects', error);
        return res.status(500).send({ message: "There was a server error, try again" })
    });
    
})