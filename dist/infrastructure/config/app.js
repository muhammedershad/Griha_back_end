"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.server = void 0;
const userRoute_1 = __importDefault(require("../route/userRoute"));
const adminRoute_1 = __importDefault(require("../route/adminRoute"));
const employeeRoute_1 = __importDefault(require("../route/employeeRoute"));
const projectRoute_1 = __importDefault(require("../route/projectRoute"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const links_1 = require("./links");
const message_1 = __importDefault(require("../../infrastructure/route/message"));
const conversation_1 = __importDefault(require("../../infrastructure/route/conversation"));
const http_1 = __importDefault(require("http"));
const tasksRoutes_1 = __importDefault(require("../route/tasksRoutes"));
const meetingRoute_1 = __importDefault(require("../route/meetingRoute"));
const paymentRoute_1 = __importDefault(require("../route/paymentRoute"));
//passport
const passport = require("passport");
const cookie_session_1 = __importDefault(require("cookie-session"));
const errorHandling_1 = __importDefault(require("../middleware/errorHandling"));
const socket_io_1 = __importDefault(require("./socket.io"));
require("../config/passport-config");
const app = (0, express_1.default)();
exports.server = http_1.default.createServer(app);
const io = (0, socket_io_1.default)(exports.server);
//passport configuration
app.use((0, cookie_session_1.default)({
    name: "google-auth-session",
    keys: ["key1", "key2"],
}));
app.use(passport.initialize());
app.use(passport.session());
const createServer = () => {
    try {
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use((0, morgan_1.default)("dev"));
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
        const corsOptions = {
            origin: [links_1.links.BASE_URL_LOCAL, links_1.links.BASE_URL,],
            methods: "GET, POST, OPTIONS, PATCH, PUT",
            credentials: true,
            optionsSuccessStatus: 204,
        };
        app.use((0, cors_1.default)(corsOptions));
        // Routes
        app.use("/api/user", userRoute_1.default);
        app.use("/api/admin", adminRoute_1.default);
        app.use("/api/employee", employeeRoute_1.default);
        app.use("/api/project", projectRoute_1.default);
        app.use('/api/message', message_1.default);
        app.use("/api/conversation", conversation_1.default);
        app.use("/api/tasks", tasksRoutes_1.default);
        app.use("/api/meeting", meetingRoute_1.default);
        app.use("/api/payment", paymentRoute_1.default);
        app.use(errorHandling_1.default);
        //test Route
        app.get("/", (req, res) => res.status(200).json({ message: "API running successfully" }));
        return app;
    }
    catch (error) {
        console.log(error);
    }
};
exports.createServer = createServer;
