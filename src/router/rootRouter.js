import express from "express";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { all } from "express/lib/application";
import { publicOnlyMiddleware } from "../middlewares";

//각각의 js 파일들은 자기만의 세계를 갖고 있음
//그러니 각 파일마다 import 시킬거 입력해야 함

const rootRouter = express.Router();

rootRouter.get("/", home); //추천 video 보여주기에 vdioController로
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin); //user가 join하기에 userController로
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

//다른 js파일에 export
export default rootRouter;
