const httpStatus = require('../utils/statusCodes');
const reactionsService = require('../services/reactionsService');

class ReactionsController {
    async createReaction(req, res) {
        const { user_id, reactions_type_id, post_id } = req.body;
        const reaction = await reactionsService.createReaction(user_id, reactions_type_id, post_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Reaction created successfully!',
            data: reaction
        });
    }
    async getReactionById(req, res) {
        const { id } = req.params;
        const reaction = await reactionsService.getReactionById(id);
        return res.status(httpStatus.OK).json(reaction);
    }
    async getReactions(req, res) {
        const reactions = await reactionsService.getAllReactions();
        return res.status(httpStatus.OK).json(reactions);
    }
    async updateReaction(req, res) {
        const { id } = req.params;
        const { user_id, reactions_type_id, post_id } = req.body;
        await reactionsService.updateReaction(id, user_id, reactions_type_id, post_id);
        return res.status(httpStatus.OK).json({
            details: "Reaction updated successfully"
        });
    }
    async deleteReaction(req, res) {
        const { id } = req.params;
        await reactionsService.deleteReaction(id);
        return res.status(httpStatus.OK).json({
            details: "Reaction deleted successfully"
        });
    }
}

module.exports = new ReactionsController();
