const Repository = require('../repositories/fileTypeRepository');

class FileTypeService {
    async createFileType(type) {

        const fileType = await Repository.create(type);

        return fileType;
    };

    async getAllFileType() {
        return Repository.getAll();
    };

    async deleteFileType(id) {
        return Repository.delete(id);
    };
}

module.exports = new FileTypeService();