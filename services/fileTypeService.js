const Repository  = require('../repositories/fileTypeRepository');
const FileType = require("../models/file_type");
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FileTypeService {
    async createFileType(type) {
        return Repository.create(type)
    };
    async getById(id){
        const fileType = await Repository.getById(id);
        if (!fileType) throw new ApiError(httpStatus.NOT_FOUND, 'File type not found!');
        return fileType;
    }
    async getAllFileType() {
        return Repository.getAll();
    };
    async deleteFileType(id) {
        await this.getById(id);
        return Repository.delete(id);
    };
}

module.exports = new FileTypeService();
