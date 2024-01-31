const httpStatus = require('../utils/statusCodes');
const userService = require('../services/userServices');
const authenticateService = require('../services/authService');
const tokenService = require('../services/tokenService');

class UserController {
  async createUser(req, res) {
    const { full_name, email, password } = req.body;
    const user = await userService.createUser(full_name, email, password);
    return res.status(httpStatus.CREATED).json({
      message: 'User created successfully!',
      data: user
    });    
  };
  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await authenticateService.authenticateLoginUser(email, password);
    const { token, refreshToken } = await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.OK).json({
      message: 'Logged in successfully',
      token: token,
      refreshToken: refreshToken
    });
  };
  async createRefreshToken(req, res){
    const { refreshToken } = req.body;
    const newRefreshToken = await tokenService.generateRefreshToken(refreshToken);
    return res.status(httpStatus.CREATED).json({
      message: 'Refresh token generated successfully',
      refreshToken: newRefreshToken
    });
  };
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(httpStatus.OK).json(user);
  };
  async getUsers(req, res) {
    const { authorization: token } = req.headers;
    await tokenService.verifyToken(token);
    const users = await userService.getAllUsers();
    return res.status(httpStatus.OK).json(users);
  };
  async updateUser(req, res) {
    const { id } = req.params;
    const { full_name, email } = req.body;
    await userService.updateUserById(id, full_name, email);
    return res.status(httpStatus.OK).json({
      details: "User updated successfully"
    });  
  };
  async deleteUser(req, res) {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(httpStatus.OK).json({
      details: "User deleted successfully"
    });
  };
  async getFeedNews(req, res) {
    const { id } = req.params;
    const feed = await userService.getFeedNews(id);
    return res.status(httpStatus.OK).json({
      feed: feed
    });
  };
  async getPostStatistics(req, res) {
    const postStatistics = await userService.getPostStatistics();
    return res.status(httpStatus.OK).json({
      post_statistics: postStatistics
    });
  };
}

module.exports = new UserController();
