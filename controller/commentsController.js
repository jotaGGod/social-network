const httpStatus = require('../utils/statusCodes');
const commentsService = require('../services/commentsService');

class CommentsController {
    async createComment(req, res) {
        const { description, user_id, post_id } = req.body;
        const comment = await commentsService.createComment(description, user_id, post_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Comment created successfully!',
            data: comment
        });
    }
    async getCommentById(req, res) {
        const { id } = req.params;
        const comment = await commentsService.getCommentById(id);
        return res.status(httpStatus.OK).json(comment);
    }
    async getComments(req, res) {
        const comments = await commentsService.getAllComments();
        return res.status(httpStatus.OK).json(comments);
    }
    async updateComment(req, res) {
        const { id } = req.params;
        const { description, user_id, post_id } = req.body;
        await commentsService.updateComment(id, description, user_id, post_id);
        return res.status(httpStatus.OK).json({
            details: "Comment updated successfully"
        });
    }
    async deleteComment(req, res) {
        const { id } = req.params;
        await commentsService.deleteComment(id);
        return res.status(httpStatus.OK).json({
            details: "Comment deleted successfully"
        });
    }
}

module.exports = new CommentsController();
