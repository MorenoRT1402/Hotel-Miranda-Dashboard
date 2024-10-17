import { endpoints } from "../../app/api";
import { GuestInterface } from "../../dto/guest";
import { Thunk } from "../genericThunk";

const bookingThunk = new Thunk<GuestInterface>(endpoints.booking);

export default bookingThunk;
