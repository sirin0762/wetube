import routes from "./routes";
import multer from "multer";
//multer -> dest : 사용자가 우리에게 보낸 파일을 저장하는 위치를 지정
const multerVideo = multer({dest: "uploads/videos/"});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube"
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };
    next();
}

export const uploadVideo = multerVideo.single("videoFlie");