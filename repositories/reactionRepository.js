const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionRepository {
    constructor(database) {
        this.database = database;
    }
    async create(user_id, reaction_type_id, post_id) {
        return this.database.create(user_id, reaction_type_id, post_id);
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, user_id, reaction_type_id, post_id) {
        this.database.update(id, user_id, reaction_type_id, post_id);
    };
    async delete (id) {
        this.database.delete(id);
    };
}

module.exports = ReactionRepository;
