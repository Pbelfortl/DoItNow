import { grupo } from "@prisma/client";
import { prisma } from "../config/database";


async function getAllExercises () {

    const musculatura = await prisma.musculatura.findMany({})
    const divisao = await prisma.divisao.findMany({})
    const exercises = await prisma.exercicio.findMany({
        include:{
            musculatura:{
                select:{
                    name:true
                }
            }
        }
    })

    return {
        musculatura:musculatura,
        exercises:exercises,
        divisao:divisao
    }
}

async function getTraining (userId: number) {

    const training = await prisma.treino.findMany({
        where:{
            userId
        },
        include: {
            divisao: true
        }
    })

    const groups = await prisma.grupo.findMany({
        where:{
            treino:{
                userId
            }
        },
        include:{
            exercicio_grupo_exercicio1Toexercicio:true,
            exercicio_grupo_exercicio2Toexercicio:true,
            exercicio_grupo_exercicio3Toexercicio:true,
            exercicio_grupo_exercicio4Toexercicio:true,
            exercicio_grupo_exercicio5Toexercicio:true,
            exercicio_grupo_exercicio6Toexercicio:true,
            exercicio_grupo_exercicio7Toexercicio:true
        }
    })

    return {
        groups,
        training
    }
}

async function postTraining (userId: number, divisaoId: number) {
    
    const training = await prisma.treino.create({
        data:{
            userId,
            divisaoId
        },
        include:{
            divisao:true
        }
    })
    return training
}

async function postGroups (userId:number, divisaoId:number, groupArr: Array<Omit<grupo, "id"&"treinoId">>) {

    const training = await prisma.treino.create({
        data:{
            userId,
            divisaoId
        }
    })

    groupArr.forEach((grp) => {
        grp.treinoId = training.id
    })

    const groups =  await prisma.grupo.createMany({
        data: groupArr
    })
}


const trainingRepository = {
    getAllExercises,
    getTraining,
    postTraining,
    postGroups
}

export default trainingRepository