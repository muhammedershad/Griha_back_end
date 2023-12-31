import express from "express";
import adminController from "../../adapter/adminController";
import AdminAuthUsecase from "../../use_case/adminAuthUsecase";
import AdminAuthRepository from "../repository/adminAuthRepository";

const repository = new AdminAuthRepository()
const useCase = new AdminAuthUsecase( repository )
const adminControl = new adminController(useCase)

const router = express.Router()

router.post('/login', ( req, res ) => adminControl.login( req, res ));

export default router