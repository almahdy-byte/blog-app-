import mongoose from "mongoose";
import { UserRole } from "../../types/user.enum";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: UserRole,
        default:UserRole.USER
    }
})
 
export const userModel = mongoose.model("user", userSchema);