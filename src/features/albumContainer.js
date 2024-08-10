const AlbumRepositoryImplementation = require("../repositories/implementation/albumRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const AlbumRepository = require("../repositories/albumRepository");
const AlbumService = require("../services/albumService");
const AlbumController = require("../controller/albumController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createAlbumRoutes = require("../routes/albumRoutes");
const { IAlbumRepository } = require("../repositories/interfaces/albumRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures and returns the album-related dependencies.
 *
 * This function sets up the instances of the repositories, services, and controllers
 * needed for handling album-related functionality, and creates the album routes.
 *
 * @returns {Object} - An object containing the album routes.
 */
function configureAlbumContainer() {
    const albumRepositoryImplementation = new AlbumRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const albumRepository = new AlbumRepository(albumRepositoryImplementation, IAlbumRepository);
    const tokenService = new TokenService(tokenRepository);
    const albumService = new AlbumService(albumRepository);
    const albumController = new AlbumController(albumService, tokenService);
    const albumRoutes = createAlbumRoutes(albumController);
    return { albumRoutes };
}

module.exports = configureAlbumContainer;
