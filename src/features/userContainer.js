const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const UserRepositoryImplementation = require("../repositories/implementation/userRepositoryImplementation");
const TokenRepository = require("../repositories/tokenRepository");
const TokenService = require("../services/tokenService");
const UserRepository = require("../repositories/userRepository");
const AuthenticateService = require("../services/authService");
const UserService = require("../services/userServices");
const UserController = require("../controller/userController");
const HashService = require("../services/cryptoService");
const createUserRoutes = require("../routes/userRoutes");
const { IUserRepository } = require("../repositories/interfaces/userRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures the User container.
 * @returns {object} The configured user routes.
 */
function configureUserContainer() {
    // Instantiate implementations
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const userRepositoryImplementation = new UserRepositoryImplementation();

    // Create repository instances
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const userRepository = new UserRepository(userRepositoryImplementation, IUserRepository);

    // Create service instances
    const hashService = new HashService();
    const tokenService = new TokenService(tokenRepository, hashService);
    const authenticateService = new AuthenticateService(userRepository, hashService);
    const userService = new UserService(userRepository, hashService);

    // Create controller instance
    const userController = new UserController(userService, authenticateService, tokenService);

    // Create routes
    const userRoutes = createUserRoutes(userController);

    return { userRoutes };
}

module.exports = configureUserContainer;
