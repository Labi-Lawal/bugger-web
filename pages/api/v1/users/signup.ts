import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../../../models/UserModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../../middlewares/jwt';
import '../../../../middlewares/database';

export default async function SignUp (req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'POST') return res.send({status: 405, message: 'Only POST request allowed'});

    const { email, password, firstname, lastname } = req.body;

    // TODO: Validate all input
    await validateInput(req.body)
    .then(()=> {
        // Check if email has already been registered
        Users.find({ email: email })
        .then((foundEmail:any)=> {
            if(foundEmail.length !== 0) return res.status(409).json({ status: 409, message: 'Email has already been registered' });

            // TODO: encrypt password
            const salt = bcrypt.genSaltSync(10);
            bcrypt.hash(password, salt)
            .then((hashedPassword)=> {
                Users.create({
                    email: email,
                    password: hashedPassword,
                    firstname: firstname,
                    lastname: lastname
                }).then(async (createdUser)=> {
                    if(!createdUser) return res.status(500).json({status: 500, message: 'There was a server error creating user'});

                    await generateToken(createdUser)
                    .then((newToken)=> {
                        createdUser.password = undefined;
                        console.log('New user has been registered');
                        return res.status(200).json({status: 200, message: 'Registration Successful', user: createdUser, token: newToken})
                    })
                    .catch((error)=> {
                        console.error('There was an error generating token', error);
                        return res.status(500).json({status: 500, message: 'There was a server error, try again'});
                    }); 
                })
                .catch((error)=> {
                    console.log('There was an error creating user');
                    return res.status(500).json({status: 500, message: 'There was an error creating user', error: error});
                }) 
            })
            .catch((error)=> {
                return res.status(500).json({status:500, message: 'There was an error encrypting password', error: error});
            });

        })
        .catch((error:any)=> {
            return res.status(500).json({status: 500, message: 'There was a server error', error: error});
        });
    })
    .catch((validationErr:any)=> res.status(422).send({status: 422, message: validationErr.message}));
}

const validateInput = (data:any)=> {
    return new Promise((resolve, reject)=> {
        const emailRegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
   
        if(Object.keys(data).length === 0) reject({ status: false, message: "Fields are empty"});
        if(!data.email) reject({ status: false, message: "Email cannot be empty"});
        if(!emailRegExp.test(data.email)) reject({ status: false, message: "Email is invalid"});
        if(!data.firstname) reject({ status: false, message: "Firstname cannot be empty"});
        if(!data.lastname) reject({ status: false,  message: "Lastname cannot be empty"});
        if(!data.password) reject({ status: false, message: "Password cannot be empty"});

        resolve({ status: true, message: "SUCCESS"});
    });
}

