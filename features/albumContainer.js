const AlbumRepositoryImplementation = require("../repositories/mySql/albumRepositoryImplementation");
const AlbumRepository = require("../repositories/albumRepository");
const AlbumService = require("../services/albumService");
const AlbumController = require("../controller/albumController");
const createAlbumRoutes = require("../routes/albumRoutes");
const { IAlbumRepository } = require("../repositories/Interfaces/albumRepositoryAbstract");

function configureAlbumContainer() {
    const albumRepositoryImplementation = new AlbumRepositoryImplementation();
    const albumRepository = new AlbumRepository(albumRepositoryImplementation, contract=IAlbumRepository);
    const albumService = new AlbumService(albumRepository);
    const albumController = new AlbumController(albumService);
    const albumRoutes = createAlbumRoutes(albumController);
    return { albumRoutes }
}

module.exports = configureAlbumContainer;
