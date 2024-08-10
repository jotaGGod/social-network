const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing reactions.
 */
class ReactionService {
    /**
     * Creates an instance of ReactionService.
     * @param {Object} reactionRepository - The repository for reaction data.
     */
    constructor(reactionRepository) {
        this.reactionRepository = reactionRepository;
    };

    /**
     * Creates a new reaction.
     * @param {number} userId - The ID of the user creating the reaction.
     * @param {number} reactionTypeId - The ID of the type of reaction.
     * @param {number} postId - The ID of the post to which the reaction is associated.
     * @returns {Promise<Object>} A promise that resolves to the created reaction.
     */
    createReaction(userId, reactionTypeId, postId) {
        return this.reactionRepository.create(userId, reactionTypeId, postId);
    };

    /**
     * Retrieves a reaction by its ID.
     * @param {number} id - The ID of the reaction to retrieve.
     * @throws {ApiError} If the reaction is not found.
     * @returns {Promise<Object>} A promise that resolves to the reaction with the specified ID.
     */
    async getReactionById(id) {
        const reaction = await this.reactionRepository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND, 'Reaction not found');
        return reaction;
    };

    /**
     * Retrieves all reactions associated with a specific user.
     * @param {number} userId - The ID of the user whose reactions are to be retrieved.
     * @returns {Promise<Array>} A promise that resolves to an array of reactions for the specified user.
     */
    getAllReactions(userId) {
        return this.reactionRepository.getAll(userId);
    };

    /**
     * Updates an existing reaction.
     * @param {number} id - The ID of the reaction to update.
     * @param {number} userId - The ID of the user updating the reaction.
     * @param {number} reactionId - The new reaction type ID.
     * @param {number} postId - The ID of the post associated with the reaction.
     * @throws {ApiError} If the reaction is not found.
     * @returns {Promise<Object>} A promise that resolves to the updated reaction.
     */
    async updateReaction(id, userId, reactionId, postId) {
        const reaction = await this.reactionRepository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND, 'Reaction not found');
        return this.reactionRepository.update(id, userId, reactionId, postId);
    };

    /**
     * Deletes a reaction by its ID.
     * @param {number} reactionId - The ID of the reaction to delete.
     * @throws {ApiError} If the reaction is not found.
     * @returns {Promise<void>} A promise that resolves when the reaction is deleted.
     */
    async deleteReaction(reactionId) {
        const reaction = await this.reactionRepository.getById(reactionId);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND, 'Reaction not found');
        await this.reactionRepository.delete(reactionId);
    };
}

module.exports = ReactionService;
