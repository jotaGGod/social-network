const User = require('../models/users');
const httpStatus = require('../utils/statusCodes');

const validation = (schema) => async (req, res, next) => {
    const {
     full_name, email
    } = req.body;
    await schema.validate({
      full_name: full_name,
      email: email
    })
    next();
};

const validateId = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });  
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    next();  
};

const validationUsers = async (req, res, next) => {
    const users = await User.findAll();  
    if (!users) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Users not found' });
    }
    next();  
};

module.exports = {
 validation,
 validateId,
 validationUsers
}
