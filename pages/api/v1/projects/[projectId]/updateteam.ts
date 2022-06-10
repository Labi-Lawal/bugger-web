import { NextApiResponse } from "next";
import { validateToken } from "../../../../../middlewares/jwt";
import { ProjectModel, UserModel } from "../../../../../models";
import Request from "../../../../../utils/Request";

export default validateToken((req:Request, res:NextApiResponse)=> {
    if(req.method !== 'POST') return res.status(405).json({ message: 'only POST request allowed'});

    const { projectId } = req.body;

    UserModel.findOne({ email: req.body.newTeamMem })
    .then(({_id})=> {
        ProjectModel.findOneAndUpdate(
            { id: projectId },
            { $push: { team: _id.toString() } },
            { new: true }
        )
        .then((updatedProject)=> {
            return res.status(200).json({ message: "New member added to project team", project: updatedProject });
        })
        .catch((error)=> {
            console.log('There was an error updating project task', error);
            return res.status(500).json({ message: 'There was an error updating project, try again' });
        });
    })
    .catch((error)=> {
        console.log('There was an error fetching user', error);
        res.status(500).json({ message: 'There was an error fetching user' });
    });
});