export enum UserStatus {
    Active = "Active",
    Inactive = "Inactive",
}

export interface UserInterface {
    _id: number;
    dateAdded: string;
    name: string;
    picture: string;
    joined: string;
    "job-desk": string;
    schedule: string[];
    contact: string;
    status: UserStatus;
}

export class User {
    _id: number;
    dateAdded: Date;
    name: string;
    picture: string;
    joined: Date;
    jobDesk: string;
    schedule: string[];
    contact: string;
    status: UserStatus;

    constructor(config: UserInterface) {
        this._id = config._id;
        this.dateAdded = new Date(config.dateAdded);
        this.name = config.name;
        this.picture = config.picture;
        this.joined = new Date(config.joined);
        this.jobDesk = config["job-desk"];
        this.schedule = config.schedule;
        this.contact = config.contact;
        this.status = config.status;
    }

    toString(): string {
        return `User Info:
        ID: ${this._id}
        Name: ${this.name}
        Picture: ${this.picture}
        Joined: ${this.joined.toDateString()}
        Job Desk: ${this.jobDesk}
        Schedule: ${this.schedule.join(", ")}
        Contact: ${this.contact}
        Status: ${this.status}
        Date Added: ${this.dateAdded.toDateString()}`;
    }
}
