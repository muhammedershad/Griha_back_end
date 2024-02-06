import Meeting, { IMeeting } from "../database/meeting";

class MeetingRepository {
    async addTimeSlot(data: IMeeting) {
        try {
            const timeSlot = new Meeting(data);
            const response = await timeSlot.save();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getTimeSlotForEmployee(employeeId: string, date: string) {
        try {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            const meeting = await Meeting.find({
                time: { $gte: startDate, $lte: endDate },
                employee: employeeId,
            }).populate("user", "name");
            return meeting;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}

export default MeetingRepository;
