const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IAlbumRepository } = require("../interfaces/albumRepositoryAbstract");
const {where} = require("sequelize");

class AlbumRepositoryImplementation extends IAlbumRepository{
    async create(description, target_id) {
        try {
            const[album] = await db('album')
                .insert({
                    description,
                    target_id
                })
                .returning('*');
            return album           
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating a new album');
        }
    };
    async getById(id){
        return db('album')
            .where({ id })
            .select('id', 'description', 'target_id', 'is_active')
            .first();        
    };
    async getAll(albumId){
        return db('album')
            .where({ id: albumId })
            .select('id', 'description', 'target_id', 'is_active');
    };
    async update(id, description, target_id) { 
        try {
            await db.transaction(async (trx) => {
                await db('album')
                    .where({ id })
                    .update({
                        description, target_id
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating album');
        }
    };
    async delete (id) {        
        try {
            await db.transaction(async (trx) => {
                await db('album')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting album');
        }
    };
}

module.exports = AlbumRepositoryImplementation;
