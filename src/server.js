import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
//router 파일들 import, default router이기에 이름 바꿔도 됨. 하지만 헷갈리니 굳이 바꾸진 않음
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/VideoRouter";
import apiRouter from "./router/apiRouter";
import { localsMiddleware } from "./middlewares";

//express, morgan 사용하기 위해 application 선언
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express에게 view engine으로 pug 사용한다고 알림
app.set("views", process.cwd() + "/src/views"); //cwd src 폴더로 변경
app.use(logger); //morgan 연결
app.use(express.urlencoded({ extended: true })); // express가 form의 value들을 이해할 수 있도록 하고, JS 객체 형식으로 변형시킴

app.use(
  // express-session
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);

//모든 Router 연결
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
