const AlbumItem = require('../models/album_item');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(post_id, album_id) {
        const t = await Sequelize.transaction();

        const existingAlbumItem = await AlbumItem.findOne({
            where: { post_id, album_id, is_active: true}
        });

        if (existingAlbumItem) throw new ApiError('Album item already exists');


        const albumItem = await AlbumItem.create(
            {
                post_id,
                album_id
            },
            { transaction: t }
        );
        await t.commit();

        return albumItem;
    };
    async getAll(){
        return await AlbumItem.findAll();
    };
    async delete (id) {
        const albumItem = await AlbumItem.findOne({ where:  { id: id } });

        if (!albumItem) throw new ApiError('Album item not found!!');

        await albumItem.destroy();

        return true;
    };

}

module.exports = new Repository();
