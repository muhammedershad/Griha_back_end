"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../../adapter/paymentController");
const router = express_1.default.Router();
router.post("/checkout-session/:paymentId", paymentController_1.getCheckoutSession);
router.post('/', paymentController_1.createPayment);
router.get('/', paymentController_1.allpayments);
router.get('/:userId', paymentController_1.userPayments);
exports.default = router;
