const Repository = require('../repositories/reactionsTypeRepository');

class ReactionsTypeService {
    async createReactionType(description) {

        const reactionType = await Repository.create(description);

        return reactionType;
    };

    async getAllReactionsType() {
        return Repository.getAll();
    };

    async deleteReactionType(id) {
        return Repository.delete(id);
    };
}

module.exports = new ReactionsTypeService();