import express from "express";
import {
  watch,
  edit,
  upload,
  deleteVideo,
} from "../controllers/videoController";
//각각의 js 파일들은 자기만의 세계를 갖고 있음
//그러니 각 파일마다 import 시킬거 입력해야 함

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

//다른 js파일에 export
export default videoRouter;
