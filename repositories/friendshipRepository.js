const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FriendshipRepository {
    constructor(database) {
        this.database = database;
    }
    async create(principal_user_id, friend_id) {
        return this.database.create(principal_user_id, friend_id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async getById(id){
        return this.database.getById(id);
    };
    async delete(id){
        this.database.delete(id);
    };
}

module.exports = FriendshipRepository;
