import { arrayToText } from "../app/utils";

//#region Interface
export enum RoomStatus {
    Available = "Available",
    Booked = "Booked",
}

export interface RoomInterface {
    _id: string;
    dateAdded: string;
    roomType: string;
    number: number;
    picture: string;
    bedType: string;
    roomFloor: string;
    facilities: string[];
    rate: string;
    discount: number;
    status: RoomStatus;
}
//#endregion

//#region Class
export class Room {
    _id: string;
    dateAdded: Date;
    roomType: string;
    number: number;
    picture: string;
    bedType: string;
    roomFloor: string;
    facilities: string[];
    rate: string;
    discount: number;
    status: RoomStatus;

    constructor(config: RoomInterface) {
        this._id = config._id;
        this.dateAdded = new Date(config.dateAdded);
        this.roomType = config.roomType;
        this.number = config.number;
        this.picture = config.picture;
        this.bedType = config.bedType;
        this.roomFloor = config.roomFloor;
        this.facilities = config.facilities;
        this.rate = config.rate;
        this.discount = config.discount;
        this.status = config.status;
    }

    toString(): string {
        return `Room Info:
        ID: ${this._id}
        Room Type: ${this.roomType}
        Number: ${this.number}
        Picture: ${this.picture}
        Bed Type: ${this.bedType}
        Room Floor: ${this.roomFloor}
        Facilities: ${arrayToText(this.facilities).join(", ")}
        Rate: ${this.rate}
        Status: ${this.status}
        Date Added: ${this.dateAdded.toDateString()}`;
    }
}
//#endregion

