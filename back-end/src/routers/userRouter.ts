import { Router } from "express";
import { signIn } from "../controllers/authController";
import { createUser } from "../controllers/userController";

const userRouter = Router();


userRouter.post("/signup", createUser)
userRouter.post("/signin", signIn)


export default userRouter