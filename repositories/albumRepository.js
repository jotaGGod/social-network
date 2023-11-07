const Album = require('../models/album');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(description, target_id) {
        const t = await Sequelize.transaction();
        const existingAlbum = await Album.findOne({ where: { description, target_id } });
        if (existingAlbum) throw new ApiError('Album already exists');
        const album = await Album.create(
            {
                description,
                target_id
            },
            { transaction: t }
        );
        await t.commit();
        return album;
    };
    async getById(id){
        const album = await Album.findOne({ where: { id } });
        if (!album) throw new ApiError('Album not found');
        return album;
    };
    async getAll(){
        return await Album.findAll()
    };
    async update(id, description, target_id) {
        const t = await Sequelize.transaction();
        const album = await Album.findOne({ where: { id } });
        if (!album) throw new ApiError('Album not found');
        album.set({
            description,
            target_id
        });
        await album.save({ transaction: t });
        await t.commit()
    };
    async delete (id) {
        const album = await Album.findOne({ where: { id } });
        if (!album) throw new ApiError('Album not found');
        await album.destroy();
        return true;
    };
}

module.exports = new Repository();
