"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../database/message"));
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const newMessage = new message_1.default(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
//get
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await message_1.default.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
