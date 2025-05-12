import { UserRole } from "../../../types/user.enum";

export interface SignUpDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}

