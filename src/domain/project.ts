export interface projectEdit {
    projectName: string;
    location: string
    teamLead: string
    address: {
        address: string
        district: string
        state: string
        pincode: string
    };
}