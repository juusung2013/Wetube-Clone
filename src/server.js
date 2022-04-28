import express from "express";
import res from "express/lib/response";
import morgan from "morgan";
//router 파일들 import, default router이기에 이름 바꿔도 됨. 하지만 헷갈리니 굳이 바꾸진 않음
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/VideoRouter";

const PORT = 4000;

//express, morgan 사용하기 위해 application 선언
const app = express();

const logger = morgan("dev");
app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

//Server Listening
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
