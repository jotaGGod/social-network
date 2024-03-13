const { FileType } = require('../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IFileTypeRepository } = require("../interfaces/fileTypeRepositoryAbstract");

class FileTypeRepositoryImplementation extends IFileTypeRepository{
    async create(type) {
        try {
            return await FileType.sequelize.transaction(async (t) => {
                return FileType.create(
                    { type: type },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating a new file type');
        }
    };
    async getAll(){
        return FileType.findAll();
    };
    async getById(id){
        return FileType.findOne(
            {
                where: {id: id},
                attributes: ['id', 'type', 'is_active']
            }
        );
    }
    async delete (id) {
        try {
            await FileType.sequelize.transaction(async (t) => {
                await FileType.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating a new file type');
        }
    };
}

module.exports = FileTypeRepositoryImplementation;
