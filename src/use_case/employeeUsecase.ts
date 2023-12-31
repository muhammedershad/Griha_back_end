import { IEmployees } from "../domain/employee"
import EmployeeRepository from "../infrastructure/repository/employeeRepository"
import { employeeInvitationMail } from "./interface/emailService"


class EmployeeUsecase {
    private employeeRepository: EmployeeRepository
    constructor( employeeRepository: EmployeeRepository ) {
        this.employeeRepository = employeeRepository
    }

    async register ( employee: IEmployees) {
        try {
            const response = await this.employeeRepository.register( employee )
            if ( response ) {
                const mailSend = await employeeInvitationMail( employee.email )
                console.log(mailSend);
                
                if ( mailSend?.status) {
                    return {
                        success: true,
                        message: 'Employee added and mail sended'
                    }
                } else {
                    return {
                        success: false,
                        message: 'Error in sending mail'
                    }
                }
            } else {
                return {
                    success: false,
                    message: 'Error in employee registration'
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default EmployeeUsecase