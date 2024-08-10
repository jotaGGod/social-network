/**
 * Service class for managing friendship requests.
 */
class FriendshipRequestService {
    /**
     * Creates an instance of FriendshipRequestService.
     * @param {Object} friendshipRequestRepository - The repository for friendship request data.
     */
    constructor(friendshipRequestRepository) {
        this.friendshipRequestRepository = friendshipRequestRepository;
    };

    /**
     * Sends a new friendship request from a sender to a receiver.
     * @param {number} senderId - The ID of the user sending the request.
     * @param {number} receiverId - The ID of the user receiving the request.
     * @returns {Promise<Object>} A promise that resolves to the created friendship request.
     */
    sendFriendshipRequest(senderId, receiverId) {
        return this.friendshipRequestRepository.create(senderId, receiverId);
    };

    /**
     * Retrieves all friendship requests for a specific user.
     * @param {number} userId - The ID of the user for whom to retrieve friendship requests.
     * @returns {Promise<Array>} A promise that resolves to an array of friendship requests for the user.
     */
    getAllFriendshipRequests(userId) {
        return this.friendshipRequestRepository.getAll(userId);
    };

    /**
     * Accepts a friendship request.
     * @param {number} requestId - The ID of the friendship request to accept.
     * @returns {Promise<void>} A promise that resolves when the request is accepted.
     */
    acceptFriendshipRequest(requestId) {
        return this.friendshipRequestRepository.accept(requestId);
    };

    /**
     * Rejects a friendship request.
     * @param {number} requestId - The ID of the friendship request to reject.
     * @returns {Promise<void>} A promise that resolves when the request is rejected.
     */
    rejectFriendshipRequest(requestId) {
        return this.friendshipRequestRepository.delete(requestId);
    };
}

module.exports = FriendshipRequestService;
