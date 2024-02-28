const httpStatus = require('../utils/statusCodes');

class FriendshipController {
    constructor(friendshipService) {
        this.friendshipService = friendshipService;
    }
    async create(req, res) {
        const { principal_user_id, friend_id } = req.body;
        const friendship = await this.friendshipService.create(principal_user_id, friend_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Friendship created successfully!',
            data: friendship
        });
    };
    async getFriendships(req, res) {
        const friendship = await this.friendshipService.getAllFriendships();
        return res.status(httpStatus.OK).json(friendship);
    };
    async getById(req, res){
        const { id } = req.params;
        const friendship = await this.friendshipService.getById(id);
        return res.status(httpStatus.OK).json(friendship);
    };
    async deleteFriendship(req, res) {
        const { id } = req.params;
        await this.friendshipService.deleteFriendship(id);
        return res.status(httpStatus.OK).json({
            details: "Friendship deleted successfully"
        });
    };
}

module.exports = FriendshipController;
