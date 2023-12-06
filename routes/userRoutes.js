const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const Validations  = require('../middlewares/validationUser');
const AuthValidations  = require('../middlewares/validationLogin');
const userSchema = require('../validation/userValidation');
const loginSchema = require('../validation/loginValidation');

router.get('/', UserController.getUsers);
router.post('/', Validations.validation(userSchema), UserController.createUser);
router.post('/login', AuthValidations.validation(loginSchema), UserController.loginUser);
router.put('/:id', Validations.validation(userSchema), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getUserById);
router.post('/refresh-token', UserController.createRefreshToken);

module.exports = router;
