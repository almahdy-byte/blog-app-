import { NextFunction, Request, Response } from "express";
import { DBServices } from "../../DB/db.services";
import { blogModel } from "../../DB/models/blog.model";
import { asyncErrorHandler } from "../../middleWare/errHandler.middleWare";
import { BlogInterFace } from "../../types/blog.type";
import { CreateBlogDTO, UpdateBlogDTO } from "./DTO/BlogDTO";
import { RequestInterFace } from "../../types/req.type";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../types/error.type";


class BlogServices {
    private _blogModel = new DBServices<BlogInterFace>(blogModel)

    // create blog
    createBlog = asyncErrorHandler(
        async (req : RequestInterFace , res : Response , next : NextFunction)=>{

            const user = req.user

            // check if user is logged in
            if(!user)
                return next(new CustomError("Unauthorized" , StatusCodes.BAD_REQUEST));

            const {title, body}:CreateBlogDTO = req.body;

            //create blog
            const blog = await this._blogModel.create({
                title,
                body,
                author: user._id as string
            })

            return res
            .status(StatusCodes.ACCEPTED)
            .json({
                message:"Blog created successfully",
                blog
            })
        }
    )
 //get blog not authentication
    getBlog = asyncErrorHandler(
        async (req : RequestInterFace, res : Response, next : NextFunction)=>{

            const {blogId} = req.params;

            // find blog
            const blog = await this._blogModel.findOne({_id : blogId  , isDeleted : false});

            //check if blog exists
            if(!blog)
                return next(new CustomError("Blog not found", StatusCodes.NOT_FOUND));

            return res
            .status(StatusCodes.ACCEPTED)
            .json({
                blog
            })
        }
    )
// update blog
    updateBlog = asyncErrorHandler(
        async (req : RequestInterFace, res : Response, next : NextFunction)=>{

            //check if user is logged in
            const user = req.user

            if(!user)
                return next(new CustomError("Unauthorized", StatusCodes.BAD_REQUEST));

            const {blogId} = req.params;

            // destruct req.body
            const {title, body}:UpdateBlogDTO = req.body;

            //find blog and check is exists
            const blog = await this._blogModel.findOne({_id : blogId  , isDeleted : false});

            if(!blog)
                return next(new CustomError("Blog not found", StatusCodes.NOT_FOUND));

            //check if user is the author of the blog
            if(blog.author.toString() !== user._id?.toString())
                return next(new CustomError("You not allowed to edit this blog", StatusCodes.BAD_REQUEST));

            //update blog
            blog.title = title || blog.title;
            blog.body = body || blog.body;
            blog.updatedAt = new Date();


            await blog.save();

            return res
            .status(StatusCodes.ACCEPTED)
            .json({
                message:"Blog updated successfully",
                blog
            })

        }
    )
//delete blog 
    deleteBlog = asyncErrorHandler(
        async (req : RequestInterFace, res : Response, next : NextFunction)=>{

            //check if user is logged in
            const user = req.user

            if(!user)
                return next(new CustomError("Unauthorized", StatusCodes.BAD_REQUEST));

            const {blogId} = req.params;


            //find blog and check is exists
            const blog = await this._blogModel.findById(blogId);

            if(!blog)
                return next(new CustomError("Blog not found", StatusCodes.NOT_FOUND));

            //check if user is the author of the blog
            if(blog.author.toString() !== user._id?.toString())
                return next(new CustomError("You not allowed to edit this blog", StatusCodes.BAD_REQUEST));


            //delete blog
            await blog.deleteOne();

            return res
            .status(StatusCodes.ACCEPTED)
            .json({
                message:"Blog is deleted successfully",
                blog
            })

        }
    )
//get all blogs for logged in user
    getAllBlogs = asyncErrorHandler(
        async (req :RequestInterFace , res : Response, next : NextFunction)=>{

            //check if user is logged in
            const user = req.user

            if(!user)
                return next(new CustomError("Unauthorized", StatusCodes.BAD_REQUEST));

            //find all blogs for logged in user
            const blogs = await this._blogModel.findAll({author: user._id , isDeleted: false});

            //check if user have any blogs
            if(!blogs.length)
                return next(new CustomError("you not have any blogs", StatusCodes.NOT_FOUND));

            return res
           .status(StatusCodes.ACCEPTED)
           .json({
                message:"All blogs",
                blogs
            })
        }
    )
    //soft delete blog
    softDeleteBlog = asyncErrorHandler(
        async (req : RequestInterFace, res : Response, next : NextFunction)=>{

            //check if user is logged in
            const user = req.user

            if(!user)
                return next(new CustomError("Unauthorized", StatusCodes.BAD_REQUEST));

            //find blog and check is exists
            const {blogId} = req.params;


            const blog = await this._blogModel.findById(blogId);

            if(!blog)
                return next(new CustomError("Blog not found", StatusCodes.NOT_FOUND));

            //check if user is the author of the blog
            if(blog.author.toString()!== user._id?.toString())
                return next(new CustomError("You not allowed to edit this blog", StatusCodes.BAD_REQUEST));


            //check if blog is soft-deleted already
            if (blog.isDeleted)
                return next(new CustomError("Blog is already soft deleted", StatusCodes.BAD_REQUEST));

            //soft delete blog
            blog.isDeleted = true;
            blog.updatedAt = new Date();

            await blog.save();

            return res
            .status(StatusCodes.ACCEPTED)
            .json({
                message:"Blog is deleted successfully",
                blog
            })
        }
    )
}


export const blogServices = new BlogServices();