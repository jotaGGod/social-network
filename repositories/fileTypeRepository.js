const FileType = require('../models/file_type');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(type) {
        const t = await Sequelize.transaction();
        const existingFileType = await FileType.findOne({
            where: { type: type, is_active: true}
        });
        if (existingFileType) throw new ApiError('File type already exists');
        const fileType = await FileType.create(
            {
                type
            },
            { transaction: t }
        );
        await t.commit();
        return fileType;
    };
    async getAll(){
        return await FileType.findAll();
    };
    async delete (id) {
        const fileType = await FileType.findOne({ where:  { id: id } });
        if (!fileType) throw new ApiError('File type not found!!');
        await fileType.destroy();
        return true;
    };
}

module.exports = new Repository();
