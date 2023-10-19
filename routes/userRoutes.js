const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const Validations  = require('../middlewares/validationUser');
const userSchema = require('../validation/userValidation')

router.post('/', Validations.validation(userSchema), UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', Validations.validation(userSchema), UserController.getUserByid);
router.put('/:id', Validations.validation(userSchema), UserController.updateUser);
router.delete('/:id', Validations.validation(userSchema), UserController.deleteUser);

module.exports = router;
