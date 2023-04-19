import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken"


export default async function verifyToken (req: AuthenticatedRequest, res: Response, next:NextFunction) {

    const authorization = req.header("Authorization");
    if(!authorization){
        return res.sendStatus(401)
    }
    
    const token = authorization.split(" ")[1]
    if(!token) {
        return res.sendStatus(401)
    }

    try{

        const {user} = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload

        req.userId = user.id

        return next()

    } catch (error) {
        if(error.name === "JsonWebTokenError" || "TokenExpiredError"){
            return res.status(401).send(error.message)
        }
        
        res.status(500).send(error)
    }
}

export type AuthenticatedRequest = Request & JwtPayload