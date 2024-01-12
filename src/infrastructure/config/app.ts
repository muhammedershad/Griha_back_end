import userRouter from "../route/userRoute";
import adminRouter from "../route/adminRoute";
import employeeRouter from "../route/employeeRoute";
import projectRouter from "../route/projectRoute";
import express, { Request, Response, NextFunction} from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

//passport
const passport = require("passport");
import cookieSession from "cookie-session";
import errorHandling from "../middleware/errorHandling";
require("../config/passport-config");

const app = express();

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

        // Enable CORS for all routes
        // app.use((req, res, next) => {
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        //     next();
        // });
        // app.use((req, res, next) => {
        //     res.header('Access-Control-Allow-Origin', '*');
        //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        //     res.header('Access-Control-Allow-Headers', 'Content-Type');
        //     res.header('Access-Control-Allow-Credentials', 'true');
        //     next();
        //   });

        const corsOptions = {
            origin: "http://localhost:8080", // Replace with the actual origin of your client
            methods: "GET, POST, OPTIONS, PATCH, PUT", // Include the necessary HTTP methods
            credentials: true, // Allow credentials (cookies)
            optionsSuccessStatus: 204, // Set the preflight response status to 204
        };
        app.use(cors(corsOptions));

        // Routes
        app.use("/api/user", userRouter);
        app.use("/api/admin", adminRouter);
        app.use("/api/employee", employeeRouter);
        app.use("/api/project", projectRouter);
        
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
