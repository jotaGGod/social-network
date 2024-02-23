const httpStatus = require('../utils/statusCodes');
const ApiError = require("../utils/ApiError");

class PostRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description, user_id, target_id, type_id) {
        try {
            return this.database.create(description, user_id, target_id, type_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating post');
        }
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, description, user_id, target_id, type_id) {
        try {
            this.database.update(id, description, user_id, target_id, type_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating post');
        }
    };
    async delete (id) {
        try {
            this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting post');
        }
    };
}

module.exports = PostRepository;
