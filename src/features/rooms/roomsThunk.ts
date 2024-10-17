import { endpoints } from "../../app/api";
import { RoomInterface } from "../../dto/room";
import { Thunk } from "../genericThunk";

const roomThunk = new Thunk<RoomInterface>(endpoints.rooms);

export default roomThunk;
