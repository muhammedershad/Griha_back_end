import userRouter from "../route/userRoute";
import adminRouter from '../route/adminRoute'
// import tutorRouter from '../route/employeeRoute'
import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import cookieParser  from "cookie-parser"

//passport
const passport = require("passport");
import cookieSession from "cookie-session"
require('../config/passport-config')

const app = express();

//passport configuration
app.use(cookieSession({ 
    name: 'google-auth-session', 
    keys: ['key1', 'key2'] 
})); 
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
            methods: "GET, POST, OPTIONS", // Include the necessary HTTP methods
            credentials: true, // Allow credentials (cookies)
            optionsSuccessStatus: 204, // Set the preflight response status to 204
        };
        app.use(cors(corsOptions));

        // Routes
        app.use("/api/user", userRouter);
        app.use('/api/admin', adminRouter)
        // app.use('/api/tutor', tutorRouter)

        //test Route
        app.get("/", (req, res) =>
            res.status(200).json({ message: "API running successfully" })
        );






        // app.use(cookieSession({ 
        //     name: 'google-auth-session', 
        //     keys: ['key1', 'key2'] 
        // })); 
        // app.use(passport.initialize()); 
        // app.use(passport.session()); 

        // // Auth
        // app.get(
        //     "/auth",
        //     passport.authenticate("google", { scope: ["email", "profile"] })
        // );

        // // Auth Callback
        // app.get(
        //     "/auth/callback",
        //     passport.authenticate("google", {
        //         successRedirect: "/auth/callback/success",
        //         failureRedirect: "/auth/callback/failure",
        //     })
        // );

        // // Success
        // app.get("/auth/callback/success", (req, res) => {
        //     if (!req.user) res.redirect("/auth/callback/failure");
        //     res.send("Welcome " + req.user);
        // });

        // // failure
        // app.get("/auth/callback/failure", (req, res) => {
        //     res.send("Error");
        // });




        

        return app;
    } catch (error) {
        console.log(error);
    }
};
