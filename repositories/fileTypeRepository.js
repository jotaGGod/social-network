const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FileTypeRepository {
    constructor(database) {
        this.database = database;
    }
    async create(type) {
        return this.database.create(type);
    };
    async getAll(){
        return this.database.getAll();
    };
    async getById(id){
        return this.database.getById(id);
    }
    async delete (id) {
        this.database.delete(id);
    };
}

module.exports = FileTypeRepository;
