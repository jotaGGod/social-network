const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IReactionTypeRepository } = require("../interfaces/reactionTypeRepositoryAbstract");

/**
 * Implementation of the reaction type repository.
 *
 * This class provides the implementation of the methods defined in the `IReactionTypeRepository` interface for managing reaction types in the database.
 */
class ReactionTypeRepositoryImplementation extends IReactionTypeRepository {

    /**
     * Creates a new reaction type in the database.
     *
     * @param {string} description - The description of the new reaction type.
     * @returns {Promise<number>} - The ID of the newly created reaction type.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(description) {
        try {
            const [reactionType] = await db.transaction(async (trx) => {
                return db('reaction_type')
                    .transacting(trx)
                    .insert({ description });
            });
            return reactionType;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating reaction type');
        }
    }

    /**
     * Retrieves a reaction type by its ID.
     *
     * @param {number} reactionTypeId - The ID of the reaction type to be retrieved.
     * @returns {Promise<Object>} - The reaction type corresponding to the provided ID.
     */
    getById(reactionTypeId) {
        return db('reaction_type')
            .where({ id: reactionTypeId })
            .select('id', 'description', 'is_active')
            .first();
    }

    /**
     * Retrieves all reaction types from the database.
     *
     * @returns {Promise<Array<Object>>} - A list of reaction types.
     */
    getAll() {
        return db('reaction_type')
            .select('id', 'description', 'is_active');
    }

    /**
     * Deletes a reaction type by its ID.
     *
     * @param {number} id - The ID of the reaction type to be deleted.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(id) {
        try {
            await db.transaction(async (trx) => {
                await db('reaction_type')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting reaction type');
        }
    }
}

module.exports = ReactionTypeRepositoryImplementation;
