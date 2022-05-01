import express from "express";
import { trending } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

//각각의 js 파일들은 자기만의 세계를 갖고 있음
//그러니 각 파일마다 import 시킬거 입력해야 함

const globalRouter = express.Router();

globalRouter.get("/", trending); //추천 video 보여주기에 vdioController로
globalRouter.get("/join", join); //user가 join하기에 userController로
globalRouter.get("/login", login);

//다른 js파일에 export
export default globalRouter;
