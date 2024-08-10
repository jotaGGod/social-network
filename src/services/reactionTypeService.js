const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing reaction types.
 */
class ReactionTypeService {
    /**
     * Creates an instance of ReactionTypeService.
     * @param {Object} reactionTypeRepository - The repository for reaction type data.
     */
    constructor(reactionTypeRepository) {
        this.reactionTypeRepository = reactionTypeRepository;
    }

    /**
     * Creates a new reaction type.
     * @param {string} description - The description of the new reaction type.
     * @returns {Promise<Object>} A promise that resolves to the created reaction type.
     */
    createReactionType(description) {
        return this.reactionTypeRepository.create(description);
    };

    /**
     * Retrieves all reaction types.
     * @returns {Promise<Array>} A promise that resolves to an array of all reaction types.
     */
    getAllReactionsType() {
        return this.reactionTypeRepository.getAll();
    };

    /**
     * Deletes a reaction type by its ID.
     * @param {number} reactionTypeId - The ID of the reaction type to delete.
     * @throws {ApiError} If the reaction type is not found.
     * @returns {Promise<void>} A promise that resolves when the reaction type is deleted.
     */
    async deleteReactionType(reactionTypeId) {
        const reactionsType = await this.reactionTypeRepository.getById(reactionTypeId);
        if (!reactionsType) throw new ApiError(httpStatus.NOT_FOUND, 'Reaction type not found');
        await this.reactionTypeRepository.delete(reactionTypeId);
    };
}

module.exports = ReactionTypeService;
