const Token = require('../models/token');
const Sequelize = require("../models/db");
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const User = require("../models/users");

class Repository {
    async createToken(token, user_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Token.create(
                    {
                        value: token,
                        user_id: user_id
                    }, { transaction: t });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating token');
        }
    };
    async getTokenByUserId(userId) {
        return Token.findOne(
            { where: { user_id: userId } }
        )
    };
    async revokeTokenByUserId(userId){
        try {
            return Sequelize.transaction(async (t) => {
                return await Token.destroy(
                    {
                        where: {user_id: userId}
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while revoking token');
        }
    }
    async updateById(id, newToken){
        try {
            return Sequelize.transaction(async (t) => {
                return Token.update({ value: newToken },
                    {
                        where: {id: id}
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting token');
        }
    }
}

module.exports = new Repository();