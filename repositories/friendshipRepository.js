const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FriendshipRepository {
    constructor(database) {
        this.database = database;
    }
    async create(principal_user_id, friend_id) {
        try {
            return this.database.create(principal_user_id, friend_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    };
    async getAll(){
        return this.database.getAll();
    };
    async getById(id){
        return this.database.getById(id);
    };
    async delete(id){
        try {
            await this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting friendship');
        }
    };
}

module.exports = FriendshipRepository;
