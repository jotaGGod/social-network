const TargetPublicRepositoryImplementation = require("../repositories/implementation/targetPublicRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const TargetPublicRepository = require("../repositories/implementation/targetPublicRepositoryImplementation");
const TargetPublicService = require("../services/targetPublicService");
const TargetPublicController = require("../controller/targetPublicController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createTargetPublicRoutes = require("../routes/targetPublicRoutes");
const { ITargetPublicRepository } = require("../repositories/interfaces/targetPublicRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures the target public container.
 * @returns {object} The configured target public routes.
 */
function configureTargetPublicContainer(){
    // Instantiate the target public repository implementation
    const targetPublicRepositoryImplementation = new TargetPublicRepositoryImplementation();

    // Instantiate the token repository implementation
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();

    // Create the token repository instance
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);

    // Create the target public repository instance
    const targetPublicRepository = new TargetPublicRepository(targetPublicRepositoryImplementation, ITargetPublicRepository);

    // Create the token service instance
    const tokenService = new TokenService(tokenRepository);

    // Create the target public service instance
    const targetPublicService = new TargetPublicService(targetPublicRepository);

    // Create the target public controller instance
    const targetPublicController = new TargetPublicController(targetPublicService, tokenService);

    // Create the target public routes
    const targetPublicRoutes = createTargetPublicRoutes(targetPublicController);

    return { targetPublicRoutes };
}

module.exports = configureTargetPublicContainer;
