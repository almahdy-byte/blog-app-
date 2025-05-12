import { NextFunction, Request, Response } from "express";
import { DBServices } from "../../DB/db.services";
import { userModel } from "../../DB/models/user.model";
import { UserInterface } from "../../types/user.type";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SignUpDTO } from "./DTO/signUpDTO";
import { LoginDTO } from "./DTO/loginDTO";
import { asyncErrorHandler } from "../../middleWare/errHandler.middleWare";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../types/error.type";


class AuthServices
{
    private _userModel = new DBServices<UserInterface>(userModel);


    signUp = asyncErrorHandler(
        // sign up controller
        async(req:Request,res:Response,next:NextFunction)=>{

            const {firstName,lastName,email,password ,role}:SignUpDTO = req.body;

            // check if user already exists
            const isExist = await this._userModel.findOne({email});

            if (isExist)
                return next(new CustomError("User already exists" , StatusCodes.CONFLICT));

            const user = await this._userModel.create({
                firstName,
                lastName,
                email,
                password : bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS)),
                role}
            );

            return res.status(201).json({
                message:"User created successfully",
                user,
                token:jwt.sign({id:user._id},process.env.JWT_SECRET as string , {expiresIn:"1w"})
            })
        }
    )

    login = asyncErrorHandler(

        async(req:Request,res:Response,next:NextFunction)=>{

            const {email,password}:LoginDTO = req.body;

            const user = await this._userModel.findOne({email});

            // check if user exists
            if(!user)
                return next(new Error("User not found"));

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            // check if password is correct
            if(!isPasswordCorrect)
                return next(new Error("Invalid password"));
            
            return res.status(200).json({
                token:jwt.sign({id:user._id},process.env.JWT_SECRET as string , {expiresIn:"1w"})
            })
        }
    )
}




export const authServices = new AuthServices();