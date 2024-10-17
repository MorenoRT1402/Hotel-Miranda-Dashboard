import { endpoints } from "../../app/api";
import { UserInterface } from "../../dto/user";
import { Thunk } from "../genericThunk";

const userThunk = new Thunk<UserInterface>(endpoints.users);

export default userThunk;
