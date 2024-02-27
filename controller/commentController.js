const httpStatus = require('../utils/statusCodes');

class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async create(req, res) {
        const { description, user_id, post_id } = req.body;
        const comment = await this.commentService.create(description, user_id, post_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Comment created successfully!',
            data: comment
        });
    }
    async getCommentById(req, res) {
        const { id } = req.params;
        const comment = await this.commentService.getCommentById(id);
        return res.status(httpStatus.OK).json(comment);
    }
    async getComments(req, res) {
        const comments = await this.commentService.getAllComments();
        return res.status(httpStatus.OK).json(comments);
    }
    async updateComment(req, res) {
        const { id } = req.params;
        const { description, user_id, post_id } = req.body;
        await this.commentService.updateComment(id, description, user_id, post_id);
        return res.status(httpStatus.OK).json({
            details: "Comment updated successfully"
        });
    }
    async deleteComment(req, res) {
        const { id } = req.params;
        await this.commentService.deleteComment(id);
        return res.status(httpStatus.OK).json({
            details: "Comment deleted successfully"
        });
    }
}

module.exports = CommentController;
