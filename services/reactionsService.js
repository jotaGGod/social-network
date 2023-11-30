const Repository = require('../repositories/reactionsRepository')
const Reactions = require("../models/reactions");
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionsService {
    async createReaction(user_id, reactions_type_id, post_id) {
        return Repository.create(user_id, reactions_type_id, post_id);
    };
    async getReactionById(id) {
        const reaction = await Repository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        return reaction;
    };
    async getAllReactions() {
        return Repository.getAll();
    };
    async updateReaction(id, user_id, reactions_type_id, post_id) {
        const reaction = await Repository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        return Repository.update(id, user_id, reactions_type_id, post_id);
    };
    async deleteReaction(id) {
        const reaction = await Repository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        return Repository.delete(id);
    };
}

module.exports = new ReactionsService();
