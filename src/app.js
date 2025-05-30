import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}));

app.use(cookieParser());

app.use(express.static("public"));


// Routes import 
import userRouter from "./routes/user.routes.js" 

//Router declaration
app.use("/api/v1/user", userRouter);


export default app;