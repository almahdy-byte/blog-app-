import { Request } from "express";
import { UserInterface } from "./user.type";

export interface RequestInterFace extends Request{
    user? : UserInterface    
}