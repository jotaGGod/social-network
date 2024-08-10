const httpStatus = require('../utils/statusCodes');

class FriendshipRequestTypeController {
    /**
     * Creates an instance of FriendshipRequestTypeController.
     * @param {object} friendshipRequestTypeService - The friendship request type service.
     */
    constructor(friendshipRequestTypeService) {
        this.friendshipRequestTypeService = friendshipRequestTypeService;
    }

    /**
     * Creates a new friendship request type.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created friendship request type.
     */
    async create(req, res) {
        const { type } = req.body;
        const friendshipRequestType = await this.friendshipRequestTypeService.create(type);
        return res.status(httpStatus.CREATED).json({
            message: 'Friendship request type created successfully!',
            data: friendshipRequestType
        });
    }

    /**
     * Gets all friendship request types.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of friendship request types.
     */
    async getAll(req, res) {
        const friendshipRequestType = await this.friendshipRequestTypeService.getAll();
        return res.status(httpStatus.OK).json(friendshipRequestType);
    }

    /**
     * Gets a friendship request type by ID.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The friendship request type.
     */
    async getById(req, res) {
        const { id } = req.params;
        const friendshipRequestType = await this.friendshipRequestTypeService.getById(id);
        return res.status(httpStatus.OK).json(friendshipRequestType);
    }

    /**
     * Deletes a friendship request type.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async delete(req, res) {
        const { id } = req.params;
        await this.friendshipRequestTypeService.delete(id);
        return res.status(httpStatus.OK).json({
            details: "Friendship request type deleted successfully"
        });
    }
}

module.exports = FriendshipRequestTypeController;
