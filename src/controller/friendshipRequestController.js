const httpStatus = require("../utils/statusCodes");

class FriendshipRequestController {
    /**
     * Creates an instance of FriendshipRequestController.
     * @param {object} friendshipRequestService - The friendship request service.
     * @param {object} tokenService - The token service.
     * @param {object} friendshipService - The friendship service.
     */
    constructor(friendshipRequestService, tokenService, friendshipService) {
        this.friendshipRequestService = friendshipRequestService;
        this.tokenService = tokenService;
        this.friendshipService = friendshipService;
    }

    /**
     * Sends a friendship request.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The creation confirmation.
     */
    async sendFriendshipRequest(req, res) {
        const { authorization: token } = req.headers;
        const senderID = await this.tokenService.getIdFromToken(token);
        const { receiver_id: receiverId } = req.body;
        await this.friendshipRequestService.sendFriendshipRequest(senderID, receiverId);
        return res.status(httpStatus.CREATED).json({
            message: 'Friendship request sent successfully!'
        });
    }

    /**
     * Gets all friendship requests for a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of friendship requests.
     */
    async getAllFriendshipRequests(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const friendshipRequests = await this.friendshipRequestService.getAllFriendshipRequests(userId);
        return res.status(httpStatus.OK).json(friendshipRequests);
    }

    /**
     * Accepts a friendship request.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The acceptance confirmation.
     */
    async acceptFriendshipRequest(req, res) {
        const { authorization: token } = req.headers;
        const receiverId = await this.tokenService.getIdFromToken(token);
        const { id: requestId } = req.params;
        const { sender_id: senderId } = req.body;
        await this.friendshipRequestService.acceptFriendshipRequest(requestId);
        this.friendshipService.create(senderId, receiverId);
        return res.status(httpStatus.OK).json({
            message: 'Friendship request accepted successfully!'
        });
    }

    /**
     * Rejects a friendship request.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The rejection confirmation.
     */
    async rejectFriendshipRequest(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id: requestId } = req.params;
        await this.friendshipRequestService.rejectFriendshipRequest(requestId);
        return res.status(httpStatus.OK).json({
            message: 'Friendship request rejected successfully!'
        });
    }
}

module.exports = FriendshipRequestController;
