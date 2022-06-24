import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
class BlogsService{
    async getAll() {
        return await dbContext.Blog.find().populate('creator');
    }
    async getById(blogId) {
        const foundBlog = await dbContext.Blog.findById(blogId).populate('creator');
        if(!foundBlog){
            throw new BadRequest("Could not find a blog with that ID")
        }
        return foundBlog;
    }
    async getBlogComments(blogId) {
        // return await dbContext.Comments.find({blogId}).populate('creator')
    }
    async create(body) {
        const blog = await dbContext.Blog.create(body)
        await blog.populate('creator')
        return blog;
    }
    async edit(body) {
        const original = await this.getById(body.id)
        // if(original.creatorId.toString() != body.creatorId) {
            //     throw new Forbidden("You do not have permission to edit this.")
            // }
            original.title = body.title || original.title
            original.subtitle = body.subtitle || original.subtitle
            original.body = body.body || original.body
            original.img = body.img || original.img
            original.isFavorite = body.isFavorite|| original.isFavorite
            await original.save()
            return original;
        }
    async remove(blogId, userId) {
        const removedBlog = await this.getById(blogId)
        if(removedBlog.creatorId.toString() !== userId){
            throw new Forbidden("You do not own this blog!")
        }
        await removedBlog.delete()
        return removedBlog;
    }

}

export const blogsService = new BlogsService()