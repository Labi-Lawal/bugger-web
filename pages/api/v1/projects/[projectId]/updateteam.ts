import { NextApiResponse } from "next";
import { validateToken } from "../../../../../middlewares/jwt";
import { ProjectModel, UserModel } from "../../../../../models";
import Request from "../../../../../utils/Request";

export default validateToken((req:Request, res:NextApiResponse)=> {
    if(req.method !== 'POST') return res.status(405).send({ message: 'only POST request allowed'});

    const { projectId } = req.body;

    UserModel.findOne({ email: req.body.newTeamMem })
    .then((foundUser)=> {
        if(foundUser === null) return res.status(404).send({ message: 'User doesn\'t exist' });

        ProjectModel.findOne({id: projectId})
        .then((foundProject)=> {

            if(foundProject.team.includes(foundUser.id)) return res.status(409).send({ message: 'User already a member' });
            
            ProjectModel.findOneAndUpdate(
                { id: projectId },
                { $push: { team: foundUser.id } },
                { new: true }
            )
            .then((updatedProject)=> {
                return res.status(200).send({ message: "New member added to project team", project: updatedProject });
            })
            .catch((error)=> {
                console.log('There was an error updating project task', error);
                return res.status(500).send({ message: 'There was an error updating project, try again' });
            });
        })
        .catch((error)=> {
            console.log(error);
        })
    })
    .catch((error)=> {
        console.log('There was an error fetching user', error);
        return res.status(500).send({ message: 'There was an error fetching user' });
    });
});