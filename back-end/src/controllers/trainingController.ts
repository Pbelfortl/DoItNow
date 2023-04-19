import { Response } from "express";
import trainingRepository from "../repositories/trainingRepository";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export async function getAllExercises (req: AuthenticatedRequest, res:Response) {

    try{

        const exercises = await trainingRepository.getAllExercises()

        res.status(200).send(exercises)

    } catch {

        res.status(500).send("Não foi possível carregar os exercícios!")
    }

}


export async function getMyTraining(req: AuthenticatedRequest, res: Response) {
    
    const {userId} = req

    try{
        const training = await trainingRepository.getTraining(userId)

        if(!training.groups) {
            return res.status(404).send("Usuário sem treino cadastrado!")
        }

        res.status(200).send(training)

    } catch (error) {
        res.sendStatus(500)
    }
}

export async function postTraining (req: AuthenticatedRequest, res: Response) {

    const {userId} = req
    const divisaoId = Number(req.body.divisaoId)

    try {
        const training = await trainingRepository.postTraining(userId, divisaoId)

        res.status(201).send(training)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postGroups (req: AuthenticatedRequest, res: Response) {
    
    const groups = req.body.groups
    const {userId} = req
    const divisaoId = req.body.divisaoId

    try {
        await trainingRepository.postGroups(userId, divisaoId, groups)
        
        res.sendStatus(201)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}