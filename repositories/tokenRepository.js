const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TokenRepository {
    constructor(database) {
        this.database = database;
    }
    async create(token, user_id) {
        return this.database.create(token, user_id);
    };
    async getTokenByUserId(userId) {
        return this.database.getTokenByUserId(userId);
    };
    async revokeTokenByUserId(userId){
        return this.database.revokeTokenByUserId(userId);
    }
    async updateById(id, newToken){
        return this.database.updateById(id, newToken);
    }
}

module.exports = TokenRepository;
