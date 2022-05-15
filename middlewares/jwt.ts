import { sign, verify } from 'jsonwebtoken';

const generateToken = (userData:any)=> {
    return new Promise((resolve, reject)=> {
        const token = sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: JSON.stringify(userData)
        }, process.env.SECRET!);

        if(!token) reject(token);
        resolve(token);
    });
}

const validateToken = (req:any, res:any, next:any)=> {
    return new Promise((resolve, reject)=> {

        const authToken = req.headers['Authorization'].split(' ')[1];

        if(!authToken) reject(res.status(403).json({status: 403, message: 'No token provided'}));
        
        verify(authToken, process.env.SECRET!, (error:any, decodedToken:any)=> {
            if(error) {
                console.error('There was an error validating token', error);
                reject(res.status(401).json({status: 401, message: 'Failed to authenticate token'}));
            }

            req.user = JSON.parse(decodedToken);
            resolve(next());
        })
    });
}

export { generateToken, validateToken }