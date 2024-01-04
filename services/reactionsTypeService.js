const Repository = require('../repositories/reactionTypeRepository');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionsTypeService {
    async createReactionType(description) {
        return await Repository.create(description);
    };
    async getAllReactionsType() {
        return Repository.getAll();
    };
    async deleteReactionType(id) {
        const reactionsType = await Repository.getById(id);
        if (!reactionsType) throw new ApiError(httpStatus.NOT_FOUND, 'Reaction type not found');
        await Repository.delete(id);
    };
}

module.exports = new ReactionsTypeService();
