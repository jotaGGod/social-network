const httpStatus = require('../utils/statusCodes');
const ReactionsTypeService = require('../services/reactionsTypeService');

class ReactionsTypeController {
    async createReactionType(req, res) {
        const { description } = req.body;
        const reactionType = await ReactionsTypeService.createReactionType(description);
        return res.status(httpStatus.CREATED).json({
            message: 'Reaction type created successfully!',
            data: reactionType
        });
    }
    async getReactionsType(req, res) {
        const reactionsType = await ReactionsTypeService.getAllReactionsType();
        return res.status(httpStatus.OK).json(reactionsType);
    }
    async deleteReactionType(req, res) {
        const { id } = req.params;
        await ReactionsTypeService.deleteReactionType(id);
        return res.status(httpStatus.OK).json({
            details: "Reaction type deleted successfully"
        });
    }
}

module.exports = new ReactionsTypeController();
