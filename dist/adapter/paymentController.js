"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPayments = exports.allpayments = exports.createPayment = exports.getCheckoutSession = void 0;
const payments_1 = __importDefault(require("../infrastructure/database/payments"));
const stripe_1 = __importDefault(require("stripe"));
require("dotenv").config();
const stripeApiKey = process.env.Strip_Private_Api_Key || "";
const getCheckoutSession = async (req, res, next) => {
    try {
        const paymentDetails = await payments_1.default.findById(req.params.paymentId);
        console.log(paymentDetails);
        const stripe = new stripe_1.default(stripeApiKey);
        const customer = await stripe.customers.create({
            name: "Jenny Rosen",
            address: {
                line1: "510 Townsend St",
                postal_code: "98140",
                city: "San Francisco",
                state: "CA",
                country: "US",
            },
        });
        //create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get("host")}/payment`,
            customer_email: "muhammedershadp@gmail.com",
            client_reference_id: req.params.adminId,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        unit_amount: (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.amount) * 100,
                        product_data: {
                            name: 'Project',
                            description: "Payment",
                            images: [
                                "https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-contemporary-house-plans-1.webp",
                                "https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-house-plansluxury-1.webp",
                            ],
                        },
                    },
                    quantity: 1,
                },
            ],
        });
        res.status(200).json({
            success: true,
            message: "payment successful",
            session,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCheckoutSession = getCheckoutSession;
const createPayment = async (req, res, next) => {
    try {
        const { paidBy, paidTo, amount, bonus, purpose, paymentType, status, project, progress, } = req.body;
        const payment = new payments_1.default(req.body);
        const response = await payment.save();
        if (response)
            return res
                .status(200)
                .json({
                success: true,
                message: "Payment created",
                payment: response,
            });
    }
    catch (error) {
        next(error);
    }
};
exports.createPayment = createPayment;
const allpayments = async (req, res, next) => {
    try {
        const response = await payments_1.default.find()
            .populate("paidBy")
            .populate("project");
        return res
            .status(200)
            .json({
            success: true,
            message: "payment data fetched",
            payments: response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.allpayments = allpayments;
const userPayments = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const response = await payments_1.default.find({ paidBy: userId })
            .populate("project")
            .populate("paidBy");
        return res
            .status(200)
            .json({
            success: true,
            message: "data fetched successfully",
            payments: response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userPayments = userPayments;
