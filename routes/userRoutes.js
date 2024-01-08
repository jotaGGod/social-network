const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const validateSchema  = require('../middlewares/userValidation');
const validateLogin  = require('../middlewares/loginValidation');
const { createUserSchema, updateUserSchema, getByIdSchema }  = require('../schemas/userSchema');
const userLoginSchema = require('../schemas/loginSchema');

router.get('/', UserController.getUsers);
router.post('/', validateSchema(createUserSchema), UserController.createUser);
router.post('/login', validateLogin(userLoginSchema), UserController.loginUser);
router.put('/:id', validateSchema(updateUserSchema), UserController.updateUser);
router.delete('/:id', validateSchema(getByIdSchema), UserController.deleteUser);
router.get('/:id', validateSchema(getByIdSchema), UserController.getUserById);
router.post('/refresh-token', UserController.createRefreshToken);

module.exports = router;
