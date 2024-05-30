const httpStatus = require('../utils/statusCodes');

class FriendshipController {
    constructor(friendshipService, tokenService) {
        this.friendshipService = friendshipService;
        this.tokenService = tokenService;
    }
    async getFriendships(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const friendship = await this.friendshipService.getAllFriendships();
        return res.status(httpStatus.OK).json(friendship);
    };
    async deleteFriendship(req, res) {
        const { id } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        await this.friendshipService.deleteFriendship(id);
        return res.status(httpStatus.OK).json({
            details: "Friendship deleted successfully"
        });
    };
}

module.exports = FriendshipController;
