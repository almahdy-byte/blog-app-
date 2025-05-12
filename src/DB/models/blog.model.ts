import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
} , {timestamps : true})


export const blogModel = mongoose.model("blog", blogSchema);