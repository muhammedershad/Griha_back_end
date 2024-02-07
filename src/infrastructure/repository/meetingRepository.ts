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
                status: "active",
            }).populate("user", "name");
            return meeting;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async cancelTimeSlot(meetingId: string) {
        try {
            const response = Meeting.findByIdAndUpdate(
                meetingId,
                {
                    $set: {
                        status: "cancelled",
                    },
                },
                { new: true }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async allTimeSlotForUser(department: string, date: string) {
        try {
            const selectedDate = new Date(date);
            const today = new Date();
            const isToday =
                selectedDate.toISOString().split("T")[0] ===
                today.toISOString().split("T")[0];

            let startDate;
            let endDate;

            if (isToday) {
                startDate = today;
                endDate = new Date(today);
                endDate.setHours(23, 59, 59, 999);
            } else {
                startDate = new Date(selectedDate);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(selectedDate);
                endDate.setHours(23, 59, 59, 999);
            }

            const meeting = await Meeting.find({
                time: { $gte: startDate, $lte: endDate },
                department,
                status: "active",
            }).populate("user", "name");
            console.log(meeting)
            return meeting;
        } catch (error) {
            throw error;
        }
    }

    async bookMeeting( meetingId: string, userId: string ) {
        try {
            const response = await Meeting.findByIdAndUpdate(meetingId, {$set: { user: userId, status: 'booked'}}, { new: true }).populate('user')
            return response
        } catch (error) {
            throw error
        }
    }

    async getScheduledMeetingOfUser( userId: string ) {
        try {
            const response = await Meeting.find({ user: userId, status: 'booked'}).populate('user')
            return response
        } catch (error) {
            throw error
        }
    }

    async getScheduledMeetingOfEmployee( employeeId: string ) {
        try {
            const response = await Meeting.find({ employee: employeeId, status: 'booked'}).populate('user')
            return response 
        } catch (error) {
            throw error
        }
    }
}

export default MeetingRepository;
