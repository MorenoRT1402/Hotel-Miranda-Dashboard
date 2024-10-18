import { RoomInterface } from "./room";

export enum GuestStatus {
    Cancelled = "Cancelled",
    Refund = "Refund",
    Booked = "Booked",
    Pending = "Pending"
}

export interface GuestInterface {
    _id: string;
    dateAdded: string;
    guest: string;
    picture: string;
    orderDate: string;
    checkIn: string;
    checkOut: string;
    notes: string[];
    room: RoomInterface;
    status: GuestStatus;
}

export class Guest {
    _id: string;
    dateAdded: Date;
    guest: string;
    picture: string;
    orderDate: Date;
    checkIn: Date;
    checkOut: Date;
    notes: string[];
    room: RoomInterface;
    status: GuestStatus;

    constructor(config: GuestInterface) {
        this._id = config._id;
        this.dateAdded = new Date(config.dateAdded);
        this.guest = config.guest;
        this.picture = config.picture;
        this.orderDate = new Date(config.orderDate);
        this.checkIn = new Date(config.checkIn);
        this.checkOut = new Date(config.checkOut);
        this.notes = config.notes;
        this.room = config.room;
        this.status = config.status;
    }

    toString(): string {
        return `Guest Info:
        ID: ${this._id}
        Name: ${this.guest}
        Picture: ${this.picture}
        Order Date: ${this.orderDate.toDateString()}
        Check-In: ${this.checkIn.toDateString()}
        Check-Out: ${this.checkOut.toDateString()}
        Room ID: ${this.room}
        Status: ${this.status}
        Notes: ${this.notes.join(", ")}
        Date Added: ${this.dateAdded.toDateString()}`;
    }
}
