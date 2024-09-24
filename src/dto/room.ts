export enum RoomStatus {
    Available = "Available",
    Booked = "Booked",
}

export interface RoomConfig {
    id: number;
    dateAdded: Date | string;
    "room-type": string;
    number: number;
    picture: string;
    "bed-type": string;
    "room-floor": string;
    facilities: string[];
    rate: string;
    status: RoomStatus;
}

export class Room {
    id: number;
    dateAdded: Date;
    roomType: string;
    number: number;
    picture: string;
    bedType: string;
    roomFloor: string;
    facilities: string[];
    rate: string;
    status: RoomStatus;

    constructor(config: RoomConfig) {
        this.id = config.id;
        this.dateAdded = new Date(config.dateAdded);
        this.roomType = config["room-type"];
        this.number = config.number;
        this.picture = config.picture;
        this.bedType = config["bed-type"];
        this.roomFloor = config["room-floor"];
        this.facilities = config.facilities;
        this.rate = config.rate;
        this.status = config.status;
    }

    toString(): string {
        return `Room Info:
        ID: ${this.id}
        Room Type: ${this.roomType}
        Number: ${this.number}
        Picture: ${this.picture}
        Bed Type: ${this.bedType}
        Room Floor: ${this.roomFloor}
        Facilities: ${this.facilities.join(", ")}
        Rate: ${this.rate}
        Status: ${this.status}
        Date Added: ${this.dateAdded.toDateString()}`;
    }
}

