//const { AlbumItem } = require('../../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IAlbumItemRepository } = require("../interfaces/albumItemRepositoryAbstract");

class AlbumItemRepositoryImplementation extends IAlbumItemRepository{
    async create(post_id, album_id) {
        try {
            return await AlbumItem.sequelize.transaction(async (t) => {
                return AlbumItem.create(
                    {
                        post_id: post_id,
                        album_id: album_id
                    }, { transaction: t });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating album item');
        }
    };
    async getById(id){
        return AlbumItem.findOne(
            {
                where: { id: id },
                attributes: ['id', 'post_id', 'album_id', 'is_active']
            }
        );
    };
    async getAll(){
        return AlbumItem.findAll(
            { attributes: ['id', 'post_id', 'album_id', 'is_active'] }
        );
    };
    async delete (id) {
        try {
            await AlbumItem.sequelize.transaction(async (t) => {
                await AlbumItem.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting album item');
        }
    };

}

module.exports = AlbumItemRepositoryImplementation;
