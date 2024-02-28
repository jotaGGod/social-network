const httpStatus = require('../utils/statusCodes');
const ApiError = require("../utils/ApiError");

class PostRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description, user_id, target_id, type_id) {
        return this.database.create(description, user_id, target_id, type_id);
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, description, user_id, target_id, type_id) {
        this.database.update(id, description, user_id, target_id, type_id);
    };
    async delete (id) {
        this.database.delete(id);
    };
}

module.exports = PostRepository;
