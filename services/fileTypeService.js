const Repository  = require('../repositories/fileTypeRepository');

class FileTypeService {
    async createFileType(type) {
        return await Repository.create(type)
    };
    async getAllFileType() {
        return Repository.getAll();
    };
    async deleteFileType(id) {
        return Repository.delete(id);
    };
}

module.exports = new FileTypeService();
