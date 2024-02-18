import { NextFunction, Request, Response } from "express";
import Payment, { IPayment } from "../infrastructure/database/payments";
import Stripe from "stripe";
require("dotenv").config();
const stripeApiKey: string = process.env.Strip_Private_Api_Key || "";

export const getCheckoutSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const paymentDetails: IPayment | null = await Payment.findById(
            req.params.paymentId
        );

        const stripe = new Stripe(stripeApiKey);

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

        // Assuming you have a payment model with customerId field, update it here
        await Payment.findByIdAndUpdate(req.params.paymentId, {
            status: "success",
        });

        // Create a checkout session with billing details
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get("host")}/payment`,
            customer: customer.id, // Use the existing or newly created customer
            client_reference_id: req.params.adminId,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        unit_amount: (paymentDetails?.amount as number) * 100,
                        product_data: {
                            name: "Project",
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
            billing_address_collection: "required", // Ensure billing details are collected
        });

        res.status(200).json({
            success: true,
            message: "payment successful",
            session,
        });
    } catch (error) {
        next(error);
    }
};

export const createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            paidBy,
            paidTo,
            amount,
            bonus,
            purpose,
            paymentType,
            status,
            project,
            progress,
        } = req.body;
        const payment = new Payment(req.body);
        const response = await payment.save();
        if (response)
            return res.status(200).json({
                success: true,
                message: "Payment created",
                payment: response,
            });
    } catch (error) {
        next(error);
    }
};

export const allpayments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await Payment.find()
            .populate("paidBy")
            .populate("project");
        return res.status(200).json({
            success: true,
            message: "payment data fetched",
            payments: response,
        });
    } catch (error) {
        next(error);
    }
};

export const userPayments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;
        const response = await Payment.find({ paidBy: userId })
            .populate("project")
            .populate("paidBy");
        return res.status(200).json({
            success: true,
            message: "data fetched successfully",
            payments: response,
        });
    } catch (error) {
        next(error);
    }
};

export const userPendingPayments = async (req: Request,res: Response,next: NextFunction) => {
    try {
        const response = await Payment.find({paidBy: req.params.userId, status:'pending'}).populate("project")
        .populate("paidBy");
        return res.status(200).json({
            success: true,
            message: "data fetched successfully",
            payments: response,
        });
    } catch (error) {
        next(error)
    }
};
