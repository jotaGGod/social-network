const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class CommentRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description, user_id, post_id) {
        return this.database.create(description, user_id, post_id);
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, description, user_id, post_id) {
        this.database.update(id, description, user_id, post_id);
    };
    async delete (id) {
        this.database.delete(id);
    };
}

module.exports = CommentRepository;
