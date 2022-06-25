import { dbContext } from "../db/DbContext";

class CommentsService{
    async postComment(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator');
        return comment;
    }
    async removeComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        comment.delete();
        return comment;
    }

}

export const commentsService = new CommentsService()