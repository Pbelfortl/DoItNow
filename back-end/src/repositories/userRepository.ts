import { prisma } from "../config/database";
import { user } from "../protocols";

async function createUser (user:user) {

    const createdUser = await prisma.user.create({
        data:{
            nome:user.name,
            email:user.email,
            password:user.password,
            idade: user.idade,
            altura:user.altura,
            peso:user.peso
        }
    })

    return createdUser
}

async function  checkEmail(email: string) {
    
    const user = await prisma.user.findFirst({
        where:{
            email: email
        }
    })
    return user
}

const userRepository = {
    createUser,
    checkEmail
}

export default userRepository