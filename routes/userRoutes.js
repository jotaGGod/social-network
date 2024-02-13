const express = require('express');
const UserController = require('../controller/userController');
const validateSchema  = require('../middlewares/userValidation');
const validateLogin  = require('../middlewares/loginValidation');
const { createUserSchema, updateUserSchema, getByIdSchema }  = require('../schemas/userSchema');
const userLoginSchema = require('../schemas/loginSchema');
const UserService = require('../services/userServices');
const UserRepository = require('../repositories/userRepository');
const AuthenticateService = require('../services/authService');
const HashService = require("../services/cryptoService");
const TokenService = require('../services/tokenService');
const TokenRepository = require("../repositories/tokenRepository");
const UserRepositoryImplementation = require("../repositories/mySql/userRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/mySql/tokenRepositoryImplementation");

const tokenRepositoryImplementation = new TokenRepositoryImplementation();
const userRepositoryImplementation = new UserRepositoryImplementation();
const tokenRepository = new TokenRepository(tokenRepositoryImplementation);
const hashService = new HashService();
const tokenService = new TokenService(tokenRepository, hashService);
const userRepository = new UserRepository(userRepositoryImplementation);
const authenticateService = new AuthenticateService(userRepository, hashService);
const userService = new UserService(userRepository, hashService);
const userController = new UserController(userService, authenticateService, tokenService);

function createUserRoutes(userController){
    const router = express.Router();
    router.get('/', userController.getUsers.bind(userController));
    router.post('/', validateSchema(createUserSchema), userController.create.bind(userController));
    router.post('/login', validateLogin(userLoginSchema), userController.loginUser.bind(userController));
    router.put('/:id', validateSchema(updateUserSchema), userController.updateUser.bind(userController));
    router.delete('/:id', validateSchema(getByIdSchema), userController.deleteUser.bind(userController));
    router.get('/:id', validateSchema(getByIdSchema), userController.getUserById.bind(userController));
    router.post('/refresh-token', userController.createRefreshToken.bind(userController));
    router.get('/:id/feed', userController.getFeedNews.bind(userController));
    router.get('/reports/post-statistics', userController.getPostStatistics.bind(userController));
    return router
}

module.exports = createUserRoutes;
