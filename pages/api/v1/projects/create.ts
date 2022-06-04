import { NextApiRequest, NextApiResponse } from "next";
import { ProjectModel, UserModel } from "../../../../models";
import { validateToken } from "../../../../middlewares/jwt";
import Request from "../../../../utils/Request"

export default validateToken(async function Create (req:Request, res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).json({status:405, message: 'only POST request allowed'});
    
    await validateInput(req.body)
    .then(()=> {
        const { title, desc } = req.body;

        ProjectModel.create({
            title: title.toLowerCase(),
            desc: desc.toLowerCase()
        })
        .then((createdProject)=> {
            const id = createdProject._id.toString()
            
            UserModel.findOneAndUpdate(
            { email: req.user.email }, 
            { 
                $set: { 'projects.recent': id },
                $push: { 
                    'projects.created': id,
                    'projects.assigned': id
                }
            },
            {new: true})
            .then((updatedUser:any) => {
                return res.status(200).json({ message: 'New project created successfully', user: updatedUser });
            })
            .catch((error:any) => {
                console.error('There was an error updating user projects', error);
                return res.status(500).json({message: "There was a server error, try again"})
            })
        })
        .catch((error)=> {
            return res.status(500).json({status:500, message: 'There was an error creating user', error: error});
        });
    })
    .catch((validationErr:any)=> res.status(422).send({status: 422, message: validationErr.message}));
});

const validateInput = (data:any)=> {
    return new Promise((resolve, reject)=> {        
        if(Object.keys(data).length ===  0) return false;
        if(!data.title) reject({ status: false, message: "Title field cannot be empty" });
        if(!data.desc) reject({ status: false, message: "Description field cannot be empty" });

        resolve({status: true, message: "SUCCESS"});
    })
}