const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { ITargetPublicRepository } = require("../interfaces/targetPublicRepositoryAbstract");

/**
 * Implementation of the target public repository.
 *
 * This class provides the implementation of the methods defined in the `ITargetPublicRepository` interface for managing target public types in the database.
 */
class TargetPublicRepositoryImplementation extends ITargetPublicRepository {

    /**
     * Creates a new target public type in the database.
     *
     * @param {string} newTargetPublicType - The target public type to be created.
     * @returns {Promise<number>} - The ID of the newly created target public type.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(newTargetPublicType) {
        try {
            const [target] = await db.transaction(async (trx) => {
                return db('target_public')
                    .transacting(trx)
                    .insert({ type: newTargetPublicType });
            });
            return target;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating target public');
        }
    }

    /**
     * Retrieves all target public types from the database.
     *
     * @returns {Promise<Array<Object>>} - A list of target public types.
     */
    async getAll() {
        return db('target_public')
            .select('id', 'type', 'is_active');
    }

    /**
     * Retrieves a target public type by its ID.
     *
     * @param {number} targetPublicTypeId - The ID of the target public type to be retrieved.
     * @returns {Promise<Object>} - The target public type corresponding to the provided ID.
     */
    async getById(targetPublicTypeId) {
        return db('target_public')
            .where({ id: targetPublicTypeId })
            .select('id', 'type', 'is_active')
            .first();
    }

    /**
     * Deletes a target public type by its ID.
     *
     * @param {number} targetPublicTypeId - The ID of the target public type to be deleted.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(targetPublicTypeId) {
        try {
            await db.transaction(async (trx) => {
                await db('target_public')
                    .where({ id: targetPublicTypeId })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting a target public');
        }
    }
}

module.exports = TargetPublicRepositoryImplementation;
