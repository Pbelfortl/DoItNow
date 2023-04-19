import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware";
import { getAllExercises, getMyTraining, postGroups, postTraining } from "../controllers/trainingController";


const trainingRoute = Router()

trainingRoute.get("/training", verifyToken, getMyTraining)
trainingRoute.post("/training", verifyToken, postTraining)
trainingRoute.post("/groups", verifyToken, postGroups)
trainingRoute.get("/exercises", verifyToken, getAllExercises)


export default trainingRoute