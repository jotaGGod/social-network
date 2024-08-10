const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRequestTypeRepository } = require("../interfaces/friendshipRequestTypeAbstract");

/**
 * Implementation of the friendship request type repository.
 *
 * This class provides the implementation of the methods defined in the `IFriendshipRequestTypeRepository` interface for managing friendship request types in the database.
 */
class FriendshipRequestTypeRepositoryImplementation extends IFriendshipRequestTypeRepository {

    /**
     * Creates a new friendship request type in the database.
     *
     * @param {string} newFriendShipRequestType - The friendship request type to be created.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(newFriendShipRequestType) {
        try {
            await db("friendship_request_type").insert({
                type: newFriendShipRequestType,
                created_at: new Date(),
                updated_at: new Date()
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request type');
        }
    }

    /**
     * Retrieves all friendship request types from the database.
     *
     * @returns {Promise<Array<Object>>} - A list of all friendship request types.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    async getAll() {
        try {
            return db("friendship_request_type").select("id", "type");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting all friendship request types');
        }
    }

    /**
     * Retrieves a friendship request type by its ID.
     *
     * @param {number} friendShipRequestTypeId - The ID of the friendship request type to be retrieved.
     * @returns {Promise<Object>} - The friendship request type corresponding to the provided ID.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    async getById(friendShipRequestTypeId) {
        try {
            return db("friendship_request_type")
                .where({ id: friendShipRequestTypeId })
                .first()
                .select("id", "type");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting friendship request type by id');
        }
    }

    /**
     * Deletes a friendship request type by its ID.
     *
     * @param {number} friendShipRequestTypeId - The ID of the friendship request type to be deleted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(friendShipRequestTypeId) {
        try {
            await db("friendship_request_type")
                .where({ id: friendShipRequestTypeId })
                .del();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting friendship request type');
        }
    }
}

module.exports = FriendshipRequestTypeRepositoryImplementation;
