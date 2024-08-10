const httpStatus = require('../utils/statusCodes');
const ApiError = require("../utils/ApiError");

class UserController {
  /**
   * Creates an instance of UserController.
   * @param {object} userService - The user service.
   * @param {object} authenticateService - The authentication service.
   * @param {object} tokenService - The token service.
   */
  constructor(userService, authenticateService, tokenService) {
    this.userService = userService;
    this.authenticateService = authenticateService;
    this.tokenService = tokenService;
  }

  /**
   * Creates a new user.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} The created user.
   */
  async create(req, res) {
    const { full_name: fullName, email, password } = req.body;
    const user = await this.userService.create(fullName, email, password);
    return res.status(httpStatus.CREATED).json({
      message: 'User created successfully!',
      data: user
    });
  }

  /**
   * Logs in a user and generates authentication tokens.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} The authentication tokens and a success message.
   * @throws {ApiError} If the email or password is incorrect.
   */
  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await this.authenticateService.authenticateLoginUser(email, password);
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password incorrect');
    const { token, refreshToken } = await this.tokenService.generateAuthTokens(user);
    return res.status(httpStatus.OK).json({
      message: 'Logged in successfully',
      token: token,
      refreshToken: refreshToken
    });
  }

  /**
   * Creates a new refresh token.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} The newly generated refresh token and a success message.
   */
  async createRefreshToken(req, res) {
    const { refreshToken } = req.body;
    const newRefreshToken = await this.tokenService.generateRefreshToken(refreshToken);
    return res.status(httpStatus.CREATED).json({
      message: 'Refresh token generated successfully',
      refreshToken: newRefreshToken
    });
  }

  /**
   * Gets a user by ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} The user data.
   * @throws {ApiError} If the token is invalid.
   */
  async getUserById(req, res) {
    const { id: userId } = req.params;
    const { authorization: token } = req.headers;
    await this.tokenService.verifyToken(token);
    const user = await this.userService.getUserById(userId);
    return res.status(httpStatus.OK).json(user);
  }

  /**
   * Gets all users.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object[]>} The list of users.
   */
  async getUsers(req, res) {
    const users = await this.userService.getAllUsers();
    return res.status(httpStatus.OK).json(users);
  }

  /**
   * Updates a user by ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} A success message.
   * @throws {ApiError} If the token is invalid.
   */
  async updateUser(req, res) {
    const { authorization: token } = req.headers;
    const userId = await this.tokenService.getIdFromToken(token);
    const { full_name: fullName, email, password } = req.body;
    await this.userService.updateUserById(userId, fullName, email, password);
    return res.status(httpStatus.OK).json({
      details: "User updated successfully"
    });
  }

  /**
   * Deletes a user by ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} A success message.
   * @throws {ApiError} If the token is invalid.
   */
  async deleteUser(req, res) {
    const { authorization: token } = req.headers;
    const userId = await this.tokenService.getIdFromToken(token);
    await this.userService.deleteUser(userId);
    return res.status(httpStatus.OK).json({
      details: "User deleted successfully"
    });
  }

  /**
   * Gets the user's feed news.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} The user's feed.
   * @throws {ApiError} If the token is invalid.
   */
  async getFeedNews(req, res) {
    const { authorization: token } = req.headers;
    const userId = await this.tokenService.getIdFromToken(token);
    const feed = await this.userService.getFeedNews(userId);
    return res.status(httpStatus.OK).json({
      feed: { posts: feed }
    });
  }

  /**
   * Gets post statistics.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<object>} The post statistics.
   */
  async getPostStatistics(req, res) {
    const postStatistics = await this.userService.getPostStatistics();
    return res.status(httpStatus.OK).json({
      post_statistics: postStatistics
    });
  }
}

module.exports = UserController;
