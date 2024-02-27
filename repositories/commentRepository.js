const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class CommentRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description, user_id, post_id) {
        try {
            return this.database.create(description, user_id, post_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating comment');
        }
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, description, user_id, post_id) {
        try {
            this.database.update(id, description, user_id, post_id)
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating comment');
        }
    };
    async delete (id) {
        try {
            this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting comment');
        }
    };
}

module.exports = CommentRepository;
