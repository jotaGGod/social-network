const TokenRepositoryImplementation = require("../repositories/mySql/tokenRepositoryImplementation");
const UserRepositoryImplementation = require("../repositories/mySql/userRepositoryImplementation");
const TokenRepository = require("../repositories/tokenRepository");
const TokenService = require("../services/tokenService");
const UserRepository = require("../repositories/userRepository");
const AuthenticateService = require("../services/authService");
const UserService = require("../services/userServices");
const UserController = require("../controller/userController");
const HashService = require("../services/cryptoService");
const createUserRoutes = require("../routes/userRoutes");

function configureUserContainer(){
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const userRepositoryImplementation = new UserRepositoryImplementation();
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation);
    const hashService = new HashService();
    const tokenService = new TokenService(tokenRepository, hashService);
    const userRepository = new UserRepository(userRepositoryImplementation);
    const authenticateService = new AuthenticateService(userRepository, hashService);
    const userService = new UserService(userRepository, hashService);
    const userController = new UserController(userService, authenticateService, tokenService);
    const userRoutes = createUserRoutes(userController);
    return { userRoutes }
}

module.exports = configureUserContainer;
