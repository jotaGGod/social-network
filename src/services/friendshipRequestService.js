class FriendshipRequestService {
    constructor(friendshipRequestRepository, friendshipService) {
        this.friendshipRequestRepository = friendshipRequestRepository;
        this.friendshipService = friendshipService;
    }
    async sendFriendshipRequest(senderId, receiverId) {
        return this.friendshipRequestRepository.create(senderId, receiverId);
    }
    async seeAllFriendshipRequests(userId) {
        return this.friendshipRequestRepository.getAll(userId);
    }
    async acceptFriendshipRequest(senderId, receiverId, requestId) {
        this.friendshipService.create(senderId, receiverId);
        this.friendshipRequestRepository.accept(requestId);
    }
    async rejectFriendshipRequest(requestId) {
        return this.friendshipRequestRepository.delete(requestId);
    }
}

module.exports = FriendshipRequestService;
