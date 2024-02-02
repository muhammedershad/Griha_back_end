import userRouter from "../route/userRoute";
import adminRouter from "../route/adminRoute";
import employeeRouter from "../route/employeeRoute";
import projectRouter from "../route/projectRoute";
import express, { Request, Response, NextFunction} from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { links } from "./links";
import messageRoute from '../../infrastructure/route/message'
import conversationRoute from "../../infrastructure/route/conversation";
import http from 'http'
import tasksRouter from '../route/tasksRoutes'

//passport
const passport = require("passport");
import cookieSession from "cookie-session";
import errorHandling from "../middleware/errorHandling";
import configureSocket from "./socket.io";
require("../config/passport-config");

const app = express();
export const server = http.createServer(app);
const io = configureSocket(server) 

//passport configuration
app.use(
    cookieSession({
        name: "google-auth-session",
        keys: ["key1", "key2"],
    })
);
app.use(passport.initialize());
app.use(passport.session());

export const createServer = () => {
    try {
        app.use(express.json());

        app.use(cookieParser());
        app.use(logger("dev"));
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, "public")));

        const corsOptions = {
            origin: [links.BASE_URL_LOCAL,links.BASE_URL,],
            methods: "GET, POST, OPTIONS, PATCH, PUT",
            credentials: true,
            optionsSuccessStatus: 204,
        };
        app.use(cors(corsOptions));

        // Routes
        app.use("/api/user", userRouter);
        app.use("/api/admin", adminRouter);
        app.use("/api/employee", employeeRouter);
        app.use("/api/project", projectRouter);
        app.use('/api/message', messageRoute);
        app.use("/api/conversation", conversationRoute);
        app.use("/api/tasks", tasksRouter);
        
        app.use(errorHandling);

        //test Route
        app.get("/", (req, res) =>
            res.status(200).json({ message: "API running successfully" })
        );

        return app;
    } catch (error) {
        console.log(error);
    }
};
