import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';
import likeRouter from "./routes/like.routes.js";
import viewRouter from "./routes/view.routes.js";
import userActivityRouter from "./routes/userDetailsByAge.routes.js"

//question
app.use("/getUserActivityByAgeRange",userActivityRouter);

app.use("/comment",commentRouter);
app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/like",likeRouter);
app.use("/view",viewRouter);

export { app }


//total likes: 21
//total posts: 10
//total comment: 10
//total views: 21
//total users: 10