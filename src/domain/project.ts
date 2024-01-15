export interface projectEdit {
    projectName: string;
    location: string;
    teamLead: string
    teamMembers: string[]
    clients: string[]
    address: {
        address: string
        district: string
        state: string
        pincode: string
    };
}

export interface ProjectProgress {
    title: string
    shortDiscription: string
    details: string
    imageUrls: string[]
    videoUrls: string[]
    otherFileUrls: string[]
    postedBy: string
}