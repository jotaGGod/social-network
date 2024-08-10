const AlbumItemRepositoryImplementation = require("../repositories/implementation/albumItemRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const AlbumItemRepository = require("../repositories/albumItemRepository");
const AlbumItemService = require("../services/albumItemService");
const AlbumItemController = require("../controller/albumItemController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createAlbumItemRoutes = require("../routes/albumItemRoutes");
const { IAlbumItemRepository } = require("../repositories/interfaces/albumItemRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures the AlbumItem container.
 * @returns {object} The configured album item routes.
 */
function configureAlbumItemContainer() {
    // Instantiate implementations
    const albumItemRepositoryImplementation = new AlbumItemRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();

    // Create repository instances
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const albumItemRepository = new AlbumItemRepository(albumItemRepositoryImplementation, IAlbumItemRepository);

    // Create service instances
    const tokenService = new TokenService(tokenRepository);
    const albumItemService = new AlbumItemService(albumItemRepository);

    // Create controller instance
    const albumItemController = new AlbumItemController(albumItemService, tokenService);

    // Create routes
    const albumItemRoutes = createAlbumItemRoutes(albumItemController);

    return { albumItemRoutes };
}

module.exports = configureAlbumItemContainer;
