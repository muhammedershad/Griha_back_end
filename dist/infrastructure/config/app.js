"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const userRoute_1 = __importDefault(require("../route/userRoute"));
// import adminRouter from '../route/adminRoute'
// import tutorRouter from '../route/employeeRoute'
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const createServer = () => {
    try {
        app.use(express_1.default.json());
        app.use((0, morgan_1.default)('dev'));
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // Enable CORS for all routes
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        // Routes
        app.use('/api/user', userRoute_1.default);
        // app.use('/api/admin', adminRouter)
        // app.use('/api/tutor', tutorRouter)
        //test Route
        app.get('/', (req, res) => res.status(200).json({ message: 'API running successfully' }));
        return app;
    }
    catch (error) {
        console.log(error);
    }
};
exports.createServer = createServer;
