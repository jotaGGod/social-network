const httpStatus = require('../utils/statusCodes');

class ReactionController {
    /**
     * Creates an instance of ReactionController.
     * @param {object} reactionService - The reaction service.
     * @param {object} tokenService - The token service.
     */
    constructor(reactionService, tokenService) {
        this.reactionService = reactionService;
        this.tokenService = tokenService;
    }

    /**
     * Creates a new reaction.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created reaction.
     */
    async createReaction(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const { reaction_type_id: reactionTypeId, post_id: postId } = req.body;
        const reaction = await this.reactionService.createReaction(userId, reactionTypeId, postId);
        return res.status(httpStatus.CREATED).json({
            message: 'Reaction created successfully!',
            data: reaction
        });
    }

    /**
     * Gets a reaction by ID.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The reaction.
     */
    async getReactionById(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const reaction = await this.reactionService.getReactionById(id);
        return res.status(httpStatus.OK).json(reaction);
    }

    /**
     * Gets all reactions for a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of reactions.
     */
    async getReactions(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const reactions = await this.reactionService.getAllReactions(userId);
        return res.status(httpStatus.OK).json(reactions);
    }

    /**
     * Updates a reaction.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The update confirmation.
     */
    async updateReaction(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const { user_id: userId, reaction_type_id: reactionTypeId, post_id: postId } = req.body;
        await this.reactionService.updateReaction(id, userId, reactionTypeId, postId);
        return res.status(httpStatus.OK).json({
            details: "Reaction updated successfully"
        });
    }

    /**
     * Deletes a reaction.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteReaction(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        await this.reactionService.deleteReaction(id);
        return res.status(httpStatus.OK).json({
            details: "Reaction deleted successfully"
        });
    }
}

module.exports = ReactionController;
