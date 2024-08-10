const httpStatus = require('../utils/statusCodes');

class FriendshipController {
    /**
     * Creates an instance of FriendshipController.
     * @param {object} friendshipService - The friendship service.
     * @param {object} tokenService - The token service.
     */
    constructor(friendshipService, tokenService) {
        this.friendshipService = friendshipService;
        this.tokenService = tokenService;
    }

    /**
     * Gets all friendships for a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of friendships.
     */
    async getFriendships(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const friendship = await this.friendshipService.getAllFriendships(userId);
        return res.status(httpStatus.OK).json(friendship);
    }

    /**
     * Gets a friendship by ID.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The friendship.
     */
    async getById(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const friendship = await this.friendshipService.getById(id);
        return res.status(httpStatus.OK).json(friendship);
    }

    /**
     * Deletes a friendship.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteFriendship(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        await this.friendshipService.deleteFriendship(id);
        return res.status(httpStatus.OK).json({
            details: "Friendship deleted successfully"
        });
    }
}

module.exports = FriendshipController;
