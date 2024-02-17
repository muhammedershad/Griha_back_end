"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/config/app");
const connectDB_1 = require("./infrastructure/config/connectDB");
const app_2 = require("./infrastructure/config/app");
const PORT = 3000;
const startServer = async () => {
    try {
        (0, app_1.createServer)();
        await (0, connectDB_1.connectDb)(); // connect to Database
        app_2.server === null || app_2.server === void 0 ? void 0 : app_2.server.listen(PORT, () => console.log(`Server running on PORT :${PORT}`)); //start server
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
