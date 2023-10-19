const Album = require('../models/album');
const Sequelize = require('../models/db');

class Repository {
    async create(description, target_id) {
        const t = await Sequelize.transaction();

        const existingAlbum = await Album.findOne({ where: { description, target_id } });

        if (existingAlbum) throw new Error('Album already exists');

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

        if (!album) throw new Error('Album not found');

        return album;
    };
    async getAll(){
        const album = await Album.findAll();

        return album
    };

    async update(id, description, target_id) {
        const t = await Sequelize.transaction();

        const album = await Album.findOne({ where: { id } });

        if (!album) throw new Error('Album not found');

        album.set({
            description,
            target_id
        });

        await album.save({ transaction: t });
        await t.commit()
    };

    async delete (id) {
        const album = await Album.findOne({ where: { id } });

        if (!album) throw new Error('Album not found');

        await album.destroy();

        return true;
    };

}

module.exports = new Repository();
