const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing friendship request types.
 */
class FriendshipRequestTypeService {
    /**
     * Creates an instance of FriendshipRequestTypeService.
     * @param {Object} friendshipRequestTypeRepository - The repository for friendship request type data.
     */
    constructor(friendshipRequestTypeRepository) {
        this.friendshipRequestTypeRepository = friendshipRequestTypeRepository;
    };

    /**
     * Creates a new friendship request type.
     * @param {Object} newFriendshipRequestType - The details of the new friendship request type.
     * @returns {Promise<Object>} A promise that resolves to the created friendship request type.
     */
    create(newFriendshipRequestType) {
        return this.friendshipRequestTypeRepository.create(newFriendshipRequestType);
    };

    /**
     * Retrieves all friendship request types.
     * @returns {Promise<Array>} A promise that resolves to an array of all friendship request types.
     */
    getAll() {
        return this.friendshipRequestTypeRepository.getAll();
    };

    /**
     * Retrieves a friendship request type by its ID.
     * @param {number} friendshipRequestTypeId - The ID of the friendship request type to retrieve.
     * @throws {ApiError} If the friendship request type is not found.
     * @returns {Promise<Object>} A promise that resolves to the friendship request type with the specified ID.
     */
    async getById(friendshipRequestTypeId) {
        const friendshipRequestType = await this.friendshipRequestTypeRepository.getById(friendshipRequestTypeId);
        if (!friendshipRequestType) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship request type not found.');
        return friendshipRequestType;
    };

    /**
     * Deletes a friendship request type by its ID.
     * @param {number} friendshipRequestTypeId - The ID of the friendship request type to delete.
     * @throws {ApiError} If the friendship request type is not found.
     * @returns {Promise<void>} A promise that resolves when the friendship request type is deleted.
     */
    async delete(friendshipRequestTypeId) {
        const friendshipRequestType = await this.friendshipRequestTypeRepository.getById(friendshipRequestTypeId);
        if (!friendshipRequestType) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship request type not found.');
        return this.friendshipRequestTypeRepository.delete(friendshipRequestTypeId);
    };
}

module.exports = FriendshipRequestTypeService;
