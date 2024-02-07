import express from "express";
import MeetingController from "../../adapter/meetingController";
import MeetingRepository from "../repository/meetingRepository";
import MeetingUsecase from "../../use_case/meetingUsecase";

const repository = new MeetingRepository()
const useCase = new MeetingUsecase( repository )
const controller = new MeetingController(useCase)

const router = express.Router()

// router.get('/', ( req, res, next ) => controller.test( req, res, next ));
router.post('/', (req, res, next) => controller.addTimeSlot( req, res, next ))
router.get('/', (req, res, next) => controller.getTimeSlotForEmployee( req, res, next))
router.patch('/:meetingId', (req, res, next) => controller.cancelTimeSlot( req, res, next))
router.get('/allTimeSlots', (req, res, next) => controller.allTimeSlotForUser( req, res, next))
router.post('/book', (req, res, next) => controller.bookMeeting( req, res, next))
router.get('/book', (req, res, next) => controller.getScheduledMeetingOfUser( req, res, next))
router.get('/employee-meetings', (req, res, next) => controller.getScheduledMeetingOfEmployee( req, res, next))

export default router