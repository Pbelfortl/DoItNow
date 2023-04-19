import { Request, Response } from "express";
import { user } from "../protocols";
import userRepository from "../repositories/userRepository";
import bcrypct from "bcrypt"
import { userSchema } from "../schemas/userSchema";


export async function createUser ( req: Request, res: Response) {

    const user = req.body

    const validateUser = userSchema.validate(user)

    if(validateUser.error) {
        console.log(validateUser.error)
        return res.sendStatus(400)
    }

    user.password = bcrypct.hashSync(user.password, 10)

    const registered = await userRepository.checkEmail(user.email)

    if(registered){
        return res.status(409).send("Email já cadastrado!")
     }

    try{

        const createdUser = userRepository.createUser(user)

        res.status(200).send(createdUser)

    } catch (error) {

        res.sendStatus(500)
    }
    
}

