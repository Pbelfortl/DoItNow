import userRepository from "../repositories/userRepository";
import { Response } from "express";
import { user } from "../protocols";

async function createUser(user:user, res:Response) {
    
    const registered = await userRepository.checkEmail(user.email)

    if(registered){
        throw res.status(403).send("Email já cadastrado!")
    }
}


const userServices = {
    createUser
}

export default userServices