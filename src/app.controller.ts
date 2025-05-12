import { Application , json, NextFunction, Request, Response} from "express";
import dbConnection from "./DB/dbConnection";
import {globalErrorHandler} from "./middleWare/errHandler.middleWare";
import authRouter from "./modules/authModule/auth.router";
import blogRouter from "./modules/blogModule/blog.router";
import { CustomError } from "./types/error.type";
import { StatusCodes } from "http-status-codes";

export const bootstrap = async (app:Application) => { 

  app.use(json());

  await dbConnection();

  app.use('/auth',authRouter);
  app.use('/blog' , blogRouter)

  app.use(
    (req:Request, res:Response, next:NextFunction)=>{
    return next(
      new CustomError("Page not found", StatusCodes.NOT_FOUND)
    )
  }
)
  app.use(globalErrorHandler)

}