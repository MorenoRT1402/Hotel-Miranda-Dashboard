export enum GuestStatus {
    Cancelled = "Cancelled",
    Refund = "Refund",
    Booked = "Booked",
    Pending = "Pending"
}

export interface GuestInterface {
    id: number;
    dateAdded: string;
    guest: string;
    picture: string;
    orderDate: string;
    checkIn: string;
    checkOut: string;
    notes: string[];
    roomId: number;
    status: GuestStatus;
}

export class Guest {
    id: number;
    dateAdded: Date;
    guest: string;
    picture: string;
    orderDate: Date;
    checkIn: Date;
    checkOut: Date;
    notes: string[];
    roomId: number;
    status: GuestStatus;

    constructor(config: GuestInterface) {
        this.id = config.id;
        this.dateAdded = new Date(config.dateAdded);
        this.guest = config.guest;
        this.picture = config.picture;
        this.orderDate = new Date(config.orderDate);
        this.checkIn = new Date(config.checkIn);
        this.checkOut = new Date(config.checkOut);
        this.notes = config.notes;
        this.roomId = config.roomId;
        this.status = config.status;
    }

    toString(): string {
        return `Guest Info:
        ID: ${this.id}
        Name: ${this.guest}
        Picture: ${this.picture}
        Order Date: ${this.orderDate.toDateString()}
        Check-In: ${this.checkIn.toDateString()}
        Check-Out: ${this.checkOut.toDateString()}
        Room ID: ${this.roomId}
        Status: ${this.status}
        Notes: ${this.notes.join(", ")}
        Date Added: ${this.dateAdded.toDateString()}`;
    }
}
