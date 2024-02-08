import express from "express";
import { getCheckoutSession, createPayment, allpayments, userPayments } from "../../adapter/paymentController";

const router = express.Router();

router.post("/checkout-session/:paymentId", getCheckoutSession);
router.post('/', createPayment)
router.get('/', allpayments)
router.get('/:userId', userPayments)

export default router;
