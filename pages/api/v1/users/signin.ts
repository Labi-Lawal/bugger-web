import "../../../../middlewares/database"
import { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "../../../../middlewares/jwt";
import { UserModel } from "../../../../models";
import { compare } from "bcrypt";

export default async function SignIn(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).send({status: 405, message: 'Only POST request allowed'});

    const { email, password } = req.body;
    console.log(email);

    UserModel.findOne({email: email})
    .then((foundUser)=> {
        if(!foundUser) return res.status(404).send({status: 404, message: 'User with email doesnt exist'});

        compare(password, foundUser.password)
        .then(async (result)=> {
            if(!result) return res.status(404).send({status: 404, message: 'Invalid Password'});
            
            await generateToken(foundUser)
            .then((newToken)=> {
                foundUser.password = undefined;
                return res.status(200).send({status: 200, message: 'Authentication Successful', user: foundUser, token: newToken})
            })
            .catch((error)=> {
                console.error('There was an error generating token', error);
                return res.status(500).send({status: 500, message: 'There was a server error, try again'});
            });
        })
        .catch((error)=> {
            console.error('Error authenticating user', error);
            res.status(500).send({status: 500, message: 'There was a server error, try again'});
        });
    })
    .catch((error)=> {
        console.error('Error finding user', error);
        res.status(500).send({status: 500, message: 'There was a server error, try again'});
    })
    

}