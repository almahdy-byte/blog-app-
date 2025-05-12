import { UserRole } from "./user.enum";

export interface UserInterface {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}
