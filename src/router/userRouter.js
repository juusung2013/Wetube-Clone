import express from "express";
import { edit, remove, see, logout } from "../controllers/userController";
//각각의 js 파일들은 자기만의 세계를 갖고 있음
//그러니 각 파일마다 import 시킬거 입력해야 함

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.get("logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

//다른 js파일에 export
export default userRouter;
