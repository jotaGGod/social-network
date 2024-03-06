const AlbumItemRepositoryImplementation = require("../repositories/mySql/albumItemRepositoryImplementation");
const AlbumItemRepository = require("../repositories/albumItemRepository");
const AlbumItemService = require("../services/albumItemService");
const AlbumItemController = require("../controller/albumItemController");
const createAlbumItemRoutes = require("../routes/albumItemRoutes");
const { IAlbumItemRepository } = require("../repositories/Interfaces/albumItemRepositoryAbstract");


function configureAlbumItemContainer() {
    const albumItemRepositoryImplementation = new AlbumItemRepositoryImplementation();
    const albumItemRepository = new AlbumItemRepository(albumItemRepositoryImplementation, contract=IAlbumItemRepository);
    const albumItemService = new AlbumItemService(albumItemRepository);
    const albumItemController = new AlbumItemController(albumItemService);
    const albumItemRoutes = createAlbumItemRoutes(albumItemController);
    return { albumItemRoutes }
}

module.exports = configureAlbumItemContainer;
