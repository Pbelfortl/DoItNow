import { Response, Request } from "express"
import jwt,{ Secret} from "jsonwebtoken"
import { account } from "../protocols"
import userRepository from "../repositories/userRepository"
import bcrypt from "bcrypt"

export async function signIn (req: Request, res: Response) {

    const account = req.body as account

    try{
        const user = await userRepository.checkEmail(account.email)

        if(!user) {
            return res.status(404).send("Usuário não cadastrado!")
        }

        const checkPassword = bcrypt.compare(account.password, user.password)

        if(!checkPassword) {
            return res.status(401).send("Senha inválida")
        }

        const token = jwt.sign({user}, process.env.JWT_SECRET as Secret, {expiresIn:'60m'})

        res.status(200).send({token:token})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}