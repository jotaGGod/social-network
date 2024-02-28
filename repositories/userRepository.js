const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class UserRepository {
    constructor(database) {
        this.database = database;
    }
    async create(full_name, email, hashedPassword) {
        return this.database.create(full_name, email, hashedPassword);
    };
    async getByEmail(email) {
        return this.database.getByEmail(email);
    };
    async getById(id){
       return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, full_name, email) {
        this.database.update(id, full_name, email);
    };
    async delete (id) {
        this.database.delete(id);
    };
    async getFeedNews(id) {
        return this.database.getFeedNews(id);
    };
    async getPostStatistics() {
        return this.database.getPostStatistics();
    };
}

module.exports = UserRepository;
