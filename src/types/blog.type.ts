
import { Document } from "mongoose";
export interface BlogInterFace extends Document{
    title: string,
    body: string,
    author: string,
    createdAt?: Date,
    updatedAt?: Date,
    isDeleted?: boolean
}