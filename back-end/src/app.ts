import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routers/userRouter"
import trainingRoute from "./routers/trainingRoutes"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(trainingRoute)

app.listen(5000, () => console.log("Rodando na 5000"))