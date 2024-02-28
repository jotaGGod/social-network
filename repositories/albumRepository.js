const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class AlbumRepository {
    constructor(database) {
        this.database = database;
    }
    async create(description, target_id) {
        return this.database.create(description, target_id);
    };
    async getById(id){
        return this.database.getById(id);
    };
    async getAll(){
        return this.database.getAll();
    };
    async update(id, description, target_id) {
        this.database.update(id, description, target_id);
    };
    async delete (id) {
        this.database.delete(id);
    };
}

module.exports = AlbumRepository;
