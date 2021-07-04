// express 모듈 불러옴
import express from "express";
//morgan : logging 모듈
import morgan from "morgan";
//helmet : 보안 모듈
import helmet, { contentSecurityPolicy } from "helmet";
//cookie-parser : cookie 이용
import cookieParser from "cookie-parser";
//body-parser : form으로 데이터 전송할 때 req 객체에 남으려고
import bodyParser from "body-parser";
//router
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import globalRouter from "./router/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middleWares";

// express 실행
const app = express();

//view engine
app.set("view engine", "pug");
//middleware
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(localsMiddleware);
//routing
// use를 사용, /user 로 들어오면 이게 userRouter 입장에서는 home인것
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

//default : 이 모듈을 통채로 export 하겠다(unnamed export)
export default app;