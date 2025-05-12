import { Router } from "express";
import { auth } from "../../middleWare/auth.middleWare";
import { blogServices } from "./blog.controller";

const router = Router()

router.post(
    '/',
    auth,
    blogServices.createBlog
)
router.route('/:blogId')
    .patch(
        auth,
        blogServices.updateBlog
    )
    .get(
        blogServices.getBlog
    )
    .delete(
        auth,
        blogServices.deleteBlog
    )
    .put(
        auth,
        blogServices.softDeleteBlog
    )
router.get(
    '/',
    auth,
    blogServices.getAllBlogs
)
export default router