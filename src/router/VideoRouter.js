import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
//각각의 js 파일들은 자기만의 세계를 갖고 있음
//그러니 각 파일마다 import 시킬거 입력해야 함

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
// 이 두줄과 동일, 같은 url 2줄 써야할 때 위 방식 사용
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

//다른 js파일에 export
export default videoRouter;
