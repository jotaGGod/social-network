const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionRepository {
    constructor(database) {
        this.database = database;
    }
    async create(user_id, reaction_type_id, post_id) {
        try {
            return await this.database.create(user_id, reaction_type_id, post_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a reaction');
        }
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, user_id, reaction_type_id, post_id) {
        try {
            await this.database.update(id, user_id, reaction_type_id, post_id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating reaction');
        }
    };
    async delete (id) {
        try {
            await this.database.delete(id);
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting reaction');
        }
    };
}

module.exports = ReactionRepository;
