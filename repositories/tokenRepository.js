const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TokenRepository {
    constructor(database) {
        this.database = database;
    }
    async create(token, user_id) {
        try {
            return this.database.create(token, user_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating token');
        }
    };
    async getTokenByUserId(userId) {
        return this.database.getTokenByUserId(userId);
    };
    async revokeTokenByUserId(userId){
        try {
           return this.database.revokeTokenByUserId(userId);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while revoking token');
        }
    }
    async updateById(id, newToken){
        try {
            return this.database.updateById(id, newToken);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting token');
        }
    }
}

module.exports = TokenRepository;
