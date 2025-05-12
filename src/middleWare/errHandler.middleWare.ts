import { NextFunction, Request, Response } from "express";
import { ErrorInterface } from "./../types/error.type";



export const asyncErrorHandler = (fn : Function ) => {

    return(
        req:Request,
        res:Response,
        next:NextFunction
        ) => {

        fn(req, res, next)
        .catch(
            (err:ErrorInterface) =>{
            next(err)
        })
    }
}


export const globalErrorHandler = 

    (
        error :ErrorInterface ,
        req:Request ,
        res:Response ,
        next:NextFunction
    ) => {
        
    res.status(error.status || 500).json(
        {
            msg : error.message,
            stack : error.stack,
            cause : error.cause,
            status : error.status
        })
}
