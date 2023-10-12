const httpStatus = require('../utils/statusCodes');
const userService = require('../services/userServices');

const UserController = {
  async createUser(req, res) {
    const { full_name, email } = req.body;

    const user = await userService.createUser(full_name, email);

    return res.status(httpStatus.CREATED).json({
      message: 'User created successfully!',
      data: user
    });    
  },
  async getUserByid(req, res) {
      const { id } = req.params;    
      const user = await userService.getUserById(id);      
      return res.status(httpStatus.OK).json(user);
  },
  async getUsers(req, res) {    
      const users = await userService.getAllUsers();      
      return res.status(httpStatus.OK).json(users);
  },
  async updateUser(req, res) {
    const { id } = req.params;    
    const user = await userService.updateUser(req);
    return res.status(httpStatus.OK).json({
      details: "User updated successfully"
    });  
  },
  async deleteUser(req, res) {
    const { id } = req.params;
    const userId = await userService.delete(id);    
    return res.status(httpStatus.OK).json({
      details: "User deleted successfully"
    });
  }
};

module.exports = UserController;
