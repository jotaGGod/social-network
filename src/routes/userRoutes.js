const express = require('express');
const validateSchema = require('../middlewares/userValidation');
const validateLogin = require('../middlewares/loginValidation');
const { createUserSchema, updateUserSchema, getByIdSchema, authorizationSchema } = require('../schemas/userSchema');
const userLoginSchema = require('../schemas/loginSchema');

/**
 * Creates routes for managing user entities.
 * @function createUserRoutes
 * @param {Object} userController - The controller instance for handling user operations.
 * @returns {express.Router} An Express router with routes for user operations.
 */
function createUserRoutes(userController) {
    const router = express.Router();

    /**
     * Route for retrieving all users.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @memberof createUserRoutes
     */
    router.get('/', userController.getUsers.bind(userController));

    /**
     * Route for creating a new user.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {Object} req.body - The request body containing user details.
     * @memberof createUserRoutes
     */
    router.post('/', validateSchema(createUserSchema), userController.create.bind(userController));

    /**
     * Route for user login.
     * @name POST /login
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {Object} req.body - The request body containing login credentials.
     * @memberof createUserRoutes
     */
    router.post('/login', validateLogin(userLoginSchema), userController.loginUser.bind(userController));

    /**
     * Route for updating a user by ID.
     * @name PUT /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the user to update.
     * @param {Object} req.body - The request body containing updated user details.
     * @memberof createUserRoutes
     */
    router.put('/:id', validateSchema(updateUserSchema), userController.updateUser.bind(userController));

    /**
     * Route for deleting a user.
     * @name DELETE /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {Object} req.body - The request body containing authorization details.
     * @memberof createUserRoutes
     */
    router.delete('/', validateSchema(authorizationSchema), userController.deleteUser.bind(userController));

    /**
     * Route for retrieving a user by ID.
     * @name GET /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the user to retrieve.
     * @memberof createUserRoutes
     */
    router.get('/:id', validateSchema(getByIdSchema), userController.getUserById.bind(userController));

    /**
     * Route for creating a refresh token.
     * @name POST /refresh-token
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @memberof createUserRoutes
     */
    router.post('/refresh-token', userController.createRefreshToken.bind(userController));

    /**
     * Route for retrieving the user's feed news.
     * @name GET /:id/feed
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the user for whom to retrieve the feed news.
     * @memberof createUserRoutes
     */
    router.get('/:id/feed', validateSchema(authorizationSchema), userController.getFeedNews.bind(userController));

    /**
     * Route for retrieving post statistics.
     * @name GET /reports/post-statistics
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @memberof createUserRoutes
     */
    router.get('/reports/post-statistics', userController.getPostStatistics.bind(userController));

    return router;
}

module.exports = createUserRoutes;
