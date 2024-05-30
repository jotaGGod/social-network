const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FriendshipService {
    constructor(friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    }
    async create(senderId, receiverId) {
        return this.friendshipRepository.create(senderId, receiverId);
    };
    async getAllFriendships(userId) {
        return this.friendshipRepository.getAll(userId);
    };
    async getById(id){
        const friendship = await this.friendshipRepository.getById(id);
        if (!friendship) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship not found.');
        return friendship;
    };
    async deleteFriendship(id) {
        await this.getById(id);
        await this.friendshipRepository.delete(id);
    };
}

module.exports = FriendshipService;
