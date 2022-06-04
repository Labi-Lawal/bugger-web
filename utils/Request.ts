import { NextApiRequest } from "next";

export default interface Request extends NextApiRequest {
    [x: string]: any;
    user: any
}