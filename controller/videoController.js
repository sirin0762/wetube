import routes from "../routes"; 
import Video from "../model/Video";
import { changePassword } from "./userController";

export const home = async (req, res) => {
    // await : async 함수에서만 작동
    try{
        const videos = await Video.find({});
        res.render("home", {pageTitle : "Home", videos: videos});
    }catch(errer){
        console.log("error");
        res.render("home", {pageTitle : "Home", videos: []});
    }
}

export const search = (req, res) => {
    const searchingBy = req.query.term;
    res.render("Search", {
        pageTitle : "Search", 
        searchingBy : searchingBy,
        videos : videos
    });
}

export const getUpload = (req, res) => res.render("upload", {pageTitle : "Upload"});

export const postUpload = async (req, res) => {
    const {
        body: {title, description}, 
        file: {path}
    } = req;
    const newVideo = await Video.create({
        fileUrl: path.replace(/[\\]/g, "/"),
        title,
        description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async(req, res) => {
    //req.params : /:id 처럼 우리가 route에서 변수같이 쓰이는 저 부분을 들고와줌
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("videoDetail", {pageTitle : video.title, video});
    }catch(error){
        res.redirect(routes.home);
    }
}

export const getEditVideo = async (req, res) => {
    const {
        params:{id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle : `Edit ${video.title}`, video});
    }catch(error){
        console.log(error);
    }
}

export const postEditVideo = async (req, res) => {
    const {
        params: {id},
        body: {title, description}
    } = req;
    try{
        await Video.findOneAndUpdate({_id: id}, {title, description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }

}

export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try{
        await Video.findOneAndRemove({_id: id});
    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
}
