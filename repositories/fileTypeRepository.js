const FileType = require('../models/file_type');
const Sequelize = require('../models/db');

class Repository {
    async create(type) {
        const t = await Sequelize.transaction();

        const existingFileType = await FileType.findOne({
            where: { type: type, is_active: true}
        });

        if (existingFileType) throw new Error('File type already exists');


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
        const fileType = await FileType.findAll();

        return fileType;
    };
    async delete (id) {
        const fileType = await FileType.findOne({ where:  { id: id } });

        if (!fileType) throw new Error('File type not found!!');

        await fileType.destroy();

        return true;
    };

}

module.exports = new Repository();
