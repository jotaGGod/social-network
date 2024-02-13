const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class UserRepository {
    constructor(database) {
        this.database = database;
    }
    async create(full_name, email, hashedPassword) {
        try {
           return this.database.create(full_name, email, hashedPassword)
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating user');
        }
    };
    async getByEmail(email) {
        try {
            return this.database.getByEmail(email);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a email by id');
        }
    };
    async getById(id){
       return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, full_name, email) {
        try {
           return this.database.update(id, full_name, email);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating user');
        }
    };
    async delete (id) {
        try {
            return this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting user');
        }
    };
    async getFeedNews(id) {
        try {
            return this.database.getFeedNews(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a feed');
        }
    };
    async getPostStatistics() {
        try {
            return this.database.getPostStatistics();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a post statistics');
        }
    };
}

module.exports = UserRepository;
