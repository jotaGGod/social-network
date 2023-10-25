const Repository = require('../repositories/reactionsTypeRepository');

class ReactionsTypeService {
    async createReactionType(description) {
        return await Repository.create(description);
    };

    async getAllReactionsType() {
        return Repository.getAll();
    };

    async deleteReactionType(id) {
        return Repository.delete(id);
    };
}

module.exports = new ReactionsTypeService();