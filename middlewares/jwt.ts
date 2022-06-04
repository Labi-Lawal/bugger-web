import { sign, verify } from 'jsonwebtoken';
import Request from '../utils/Request';

const generateToken = (userData:any)=> {
    return new Promise((resolve, reject)=> {
        const token = sign({
            exp: Math.floor(Date.now() / 1000) + (24 * 3600),
            data: JSON.stringify(userData)
        }, process.env.SECRET!);

        if(!token) reject(token);
        resolve(token);
    });
}

const validateToken = (handler:any)=> {
    return async (req:Request, res:any)=> {
        
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(403).json({status: 403, message: 'No token provided'});
        if(authToken.split(' ')[0] !== 'Bearer') return res.status(403).json({status: 403, message: 'Invalid token'});
        
        const token = authToken.split(' ')[1];

        verify(token, process.env.SECRET!, (error:any, decodedToken:any)=> {
            if(error) {
                console.error('There was an error validating token', error);
                return res.status(401).json({status: 401, message: 'Failed to authenticate token'});
            }

            req.user = JSON.parse(decodedToken.data);
            return handler(req, res);
        })

    }
}

export { generateToken, validateToken }