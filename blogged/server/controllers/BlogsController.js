import { Auth0Provider } from "@bcwdev/auth0provider";
import { blogsService } from "../services/BlogsService";
import BaseController from "../utils/BaseController";
export class BlogsController extends BaseController {
    constructor(){

        super('api/blogs')
        this.router
        .get('', this.getAll)
        .get('/:blogId', this.getById)
        .get('/:blogId/comments', this.getBlogComments)

        //Auth below this point required
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .put('/:blogId', this.edit)
        .delete('/:blogId', this.remove)
    }
    async getAll(req, res, next) {
        try {
            const blogs = await blogsService.getAll()
            return res.send(blogs);
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const foundBlog = await blogsService.getById(req.params.blogId)
            return res.send(foundBlog);
        } catch (error) {
            next(error)
        }
    }
    async getBlogComments(req, res, next) {
        try {
            const comments = await blogsService.getBlogComments(req.params.blogId)
            return res.send(comments);
        } catch (error) {
            next(error)
            
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const blog = await blogsService.create(req.body)
            return res.send(blog)
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            req.body.id = req.params.blogId
            req.body.creatorId = req.userInfo.id
            const blog = await blogsService.edit(req.body);
            return res.send(blog);
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const removedBlog = await blogsService.remove(req.params.blogId, req.userInfo.id)
            return res.send(removedBlog);
        } catch (error) {
            next(error)
        }
    }
}