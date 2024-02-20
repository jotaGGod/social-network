const httpStatus = require('../utils/statusCodes');

class ReactionController {
    constructor(reactionService) {
        this.reactionService = reactionService;
    }
    async createReaction(req, res) {
        const { user_id, reaction_type_id, post_id } = req.body;
        const reaction = await this.reactionService.createReaction(user_id, reaction_type_id, post_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Reaction created successfully!',
            data: reaction
        });
    }
    async getReactionById(req, res) {
        const { id } = req.params;
        const reaction = await this.reactionService.getReactionById(id);
        return res.status(httpStatus.OK).json(reaction);
    }
    async getReactions(req, res) {
        const reactions = await this.reactionService.getAllReactions();
        return res.status(httpStatus.OK).json(reactions);
    }
    async updateReaction(req, res) {
        const { id } = req.params;
        const { user_id, reaction_type_id, post_id } = req.body;
        await this.reactionService.updateReaction(id, user_id, reaction_type_id, post_id);
        return res.status(httpStatus.OK).json({
            details: "Reaction updated successfully"
        });
    }
    async deleteReaction(req, res) {
        const { id } = req.params;
        await this.reactionService.deleteReaction(id);
        return res.status(httpStatus.OK).json({
            details: "Reaction deleted successfully"
        });
    }
}

module.exports = ReactionController;
