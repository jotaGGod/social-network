const httpStatus = require('../utils/statusCodes');
const friendshipService = require('../services/friendshipServices');

class FriendshipController {
    async createFriendship(req, res) {
        const { principal_user_id, friend_id } = req.body;
        const friendship = await friendshipService.createFriendship(principal_user_id, friend_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Friendship created successfully!',
            data: friendship
        });
    };
    async getFriendships(req, res) {
        const friendship = await friendshipService.getAllFriendships();
        return res.status(httpStatus.OK).json(friendship);
    };
    async getById(req, res){
        const { id } = req.params;
        const friendship = await friendshipService.getById(id);
        return res.status(httpStatus.OK).json(friendship);
    };
    async deleteFriendship(req, res) {
        const { id } = req.params;
        await friendshipService.deleteFriendship(id);
        return res.status(httpStatus.OK).json({
            details: "Friendship deleted successfully"
        });
    };
    async testeRRRRRR(){
        return console.log("pau no cu")
    }
}

module.exports = new FriendshipController();
