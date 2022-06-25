import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postComment)
        .delete('/:commentId', this.removeComment)
    }
    async postComment(req, res, next) {
        try {
            req.body.id = req.params.blogId
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.postComment(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async removeComment(req, res, next) {
        try {
            const removed = await commentsService.removeComment(req.params.commentId, req.userInfo.id)
            return res.send(removed);
        } catch (error) {
            next(error)
        }
    }
}