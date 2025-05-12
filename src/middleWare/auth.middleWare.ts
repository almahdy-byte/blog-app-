import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "./errHandler.middleWare";
import jwt from "jsonwebtoken";
import { DBServices } from "../DB/db.services";
import { userModel } from "../DB/models/user.model";
import { UserInterface } from "../types/user.type";
import { RequestInterFace } from "../types/req.type";


// Middleware to authenticate user
export const auth = asyncErrorHandler(
            async(
                req : RequestInterFace,
                res : Response,
                next : NextFunction
            )=>{
                
                // get authorization header
            const authorization = req.headers['authorization'];

            if (!authorization)
                return next(new Error("Unauthorized"));

            // get token & barer
            const [ barer , token ] = authorization.split(" ");            

            //check if barer is Bearer and token is valid
            if (!barer || barer !== "Bearer" || !token){
                return next(new Error("Unauthorized"));
            }

            //verify token
            const decoded:jwt.JwtPayload = jwt.verify(
                token,process.env.JWT_SECRET as string)as jwt.JwtPayload;
            

            //check if decoded is valid
            if(!decoded)
                return next(new Error("Unauthorized"));


            //check if user exists
            const _userModel = new DBServices<UserInterface>(userModel);

            
            const user = await _userModel.findById(decoded.id);
            if (!user)
                return next(new Error("Unauthorized"));

            
            req.user = user;
            
            next();
        })
