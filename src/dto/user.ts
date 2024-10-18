export enum UserStatus {
    Active = "Active",
    Inactive = "Inactive",
}

export interface UserInterface {
    _id: string;
    dateAdded: string;
    name: string;
    picture: string;
    position: string;
    email: string;
    joined: string;
    jobDesk: string;
    schedule: string[];
    contact: string;
    status: UserStatus;
}

export class User {
    _id: string;
    dateAdded: Date;
    name: string;
    picture: string;
    position: string;
    email: string;
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
        this.position = config.position;
        this.email = config.email;
        this.joined = new Date(config.joined);
        this.jobDesk = config.jobDesk;
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
