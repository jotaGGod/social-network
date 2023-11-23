const User = require('../models/users');
const Sequelize = require('../models/db');
const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class Repository {
    async createUser(full_name, email, hashedPassword) {
        try {
            return Sequelize.transaction(async (t) => {
                return User.create(
                    {
                        full_name,
                        email,
                        password: hashedPassword
                    }, { transaction: t });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating user');
        }
    };
    async getByEmail(email) {
        try {
            return Sequelize.transaction(async (t) => {
                return User.findOne({ where: { email } });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while getting a user');
        }
    };
    async getById(id){
        try {
            return Sequelize.transaction(async (t) => {
                return User.findOne({
                    where: { id: id },
                    attributes: ['id', 'full_name', 'email']
                });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while getting a user');
        }
    };
    async getAll(){
        return await User.findAll({
            attributes: ['id', 'full_name', 'email']
        });
    };
    async update(id, full_name, email) {
        try {
            return Sequelize.transaction(async (t) => {
                const user = await User.findOne({ where: { id } });
                await t.commit();
                return user.set({
                    full_name,
                    email
                });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating a user');
        }
    };

    async delete (id) {
        try {
            return Sequelize.transaction(async (t) => {
                const user = await User.findOne({ where: { id } });
                return user.destroy();
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting a user');
        }
    };
}

module.exports = new Repository();
