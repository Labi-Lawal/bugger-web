import "../../../../middlewares/database"
import { NextApiResponse } from "next";
import { UserModel } from "../../../../models";
import { validateToken } from "../../../../middlewares/jwt";
import Request from "../../../../utils/Request";

export default validateToken((req:Request, res: NextApiResponse)=> {
    if(req.method !== 'GET') return res.status(405).send({status: 405, message: 'Only GET request allowed'});

    const userId:string = (req.query.userId === 'me')  ?req.user._id  : req.query.userId;

    UserModel.findOne({ _id: userId })
    .then((foundUser)=> {
        if(!foundUser) return res.status(405).send({ message: 'User doesn\'t exist'});
        return res.status(200).send({ user: foundUser });
    })
    .catch((error)=> {
        console.error(error);
        return res.status(500).send({ message: "There was a server error find user, please try again." })
    });
});