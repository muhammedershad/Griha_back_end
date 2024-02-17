"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_1 = __importDefault(require("../database/conversation"));
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const { senderId, receiverId } = req.body;
    console.log(senderId, receiverId);
    const conversation = await conversation_1.default.find({
        members: { $all: [senderId, receiverId] }
    });
    console.log(conversation, 'von');
    if (conversation.length !== 0) {
        return res
            .status(200)
            .json({ success: true, message: "conversation already existed", conversation });
    }
    const newConversation = new conversation_1.default({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json({ success: true, message: 'new conversation', conversation: savedConversation });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get("/:userId", async (req, res) => {
    try {
        console.log(req.params.userId);
        const conversation = await conversation_1.default.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await conversation_1.default.findOne({
            members: {
                $all: [req.params.firstUserId, req.params.secondUserId],
            },
        });
        res.status(200).json(conversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
