const httpStatus = require('../utils/statusCodes');

class ReactionTypeController {
    /**
     * Creates an instance of ReactionTypeController.
     * @param {object} reactionTypeService - The reaction type service.
     * @param {object} tokenService - The token service.
     */
    constructor(reactionTypeService, tokenService) {
        this.reactionTypeService = reactionTypeService;
        this.tokenService = tokenService;
    }

    /**
     * Creates a new reaction type.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created reaction type.
     */
    async createReactionType(req, res) {
        const { description } = req.body;
        const reactionType = await this.reactionTypeService.createReactionType(description);
        return res.status(httpStatus.CREATED).json({
            message: 'Reaction type created successfully!',
            data: reactionType
        });
    }

    /**
     * Gets all reaction types.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of reaction types.
     */
    async getReactionsType(req, res) {
        const reactionsType = await this.reactionTypeService.getAllReactionsType();
        return res.status(httpStatus.OK).json(reactionsType);
    }

    /**
     * Deletes a reaction type.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteReactionType(req, res) {
        const { id } = req.params;
        await this.reactionTypeService.deleteReactionType(id);
        return res.status(httpStatus.OK).json({
            details: "Reaction type deleted successfully"
        });
    }
}

module.exports = ReactionTypeController;
