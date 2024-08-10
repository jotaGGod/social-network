const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing reactions.
 * @class ReactionRepository
 */
class ReactionRepository {
    /**
     * Creates an instance of ReactionRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new reaction.
     * @param {number} userId - The ID of the user making the reaction.
     * @param {number} reactionTypeId - The ID of the type of reaction.
     * @param {number} postId - The ID of the post being reacted to.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(userId, reactionTypeId, postId) {
        return this.repository.create(userId, reactionTypeId, postId);
    }

    /**
     * Retrieves a reaction by its ID.
     * @param {number} reactionId - The ID of the reaction to retrieve.
     * @returns {Promise} A promise that resolves with the reaction.
     */
    getById(reactionId) {
        return this.repository.getById(reactionId);
    }

    /**
     * Retrieves all reactions associated with a given user ID.
     * @param {number} userId - The ID of the user to retrieve reactions for.
     * @returns {Promise} A promise that resolves with all reactions.
     */
    getAll(userId) {
        return this.repository.getAll(userId);
    }

    /**
     * Updates a reaction by its ID.
     * @param {number} reactionId - The ID of the reaction to update.
     * @param {number} userId - The ID of the user making the update.
     * @param {number} reactionTypeId - The new type of reaction.
     * @param {number} postId - The ID of the post being reacted to.
     * @returns {Promise} A promise that resolves when the reaction is updated.
     */
    update(reactionId, userId, reactionTypeId, postId) {
        return this.repository.update(reactionId, userId, reactionTypeId, postId);
    }

    /**
     * Deletes a reaction by its ID.
     * @param {number} reactionId - The ID of the reaction to delete.
     * @returns {Promise} A promise that resolves when the reaction is deleted.
     */
    delete(reactionId) {
        return this.repository.delete(reactionId);
    }
}

module.exports = ReactionRepository;
