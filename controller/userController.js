const httpStatus = require('../utils/statusCodes');
const userService = require('../services/userServices');
const bcrypt = require('bcrypt');

class UserController {
  async createUser(req, res) {
    const { full_name, email, password } = req.body;
    const criptoPass = await bcrypt.hash(password, 10);
    const user = await userService.createUser(full_name, email, criptoPass);
    return res.status(httpStatus.CREATED).json({
      message: 'User created successfully!',
      data: user
    });    
  };
  async loginUser(req,res) {
    const { email, password } = req.body;
    const auth = await userService.loginUser(email, password);
    if (!auth) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Incorrect password!!'
      })
    }else{
      return res.status(httpStatus.OK).json({
        message: 'Logged in successfully'
      });
    }
  };
  async getUserById(req, res) {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.status(httpStatus.OK).json(user);
  };
  async getUsers(req, res) {    
      const users = await userService.getAllUsers();
      return res.status(httpStatus.OK).json(users);
  };
  async updateUser(req, res) {
    const { id } = req.params;
    const { full_name, email } = req.body;
    const user = await userService.updateUser(id, full_name, email);
    return res.status(httpStatus.OK).json({
      details: "User updated successfully",
      data: user
    });  
  };
  async deleteUser(req, res) {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(httpStatus.OK).json({
      details: "User deleted successfully"
    });
  };
}

module.exports = new UserController();
