const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const validate  = require('../middlewares/validationUser');
const validateLogin  = require('../middlewares/validationLogin');
const { createUserSchema, updateUserSchema, getByIdSchema }  = require('../validation/userValidation');
const loginSchema = require('../validation/loginValidation');

router.get('/', UserController.getUsers);
router.post('/', validate(createUserSchema), UserController.createUser);
router.post('/login', validateLogin(loginSchema), UserController.loginUser);
router.put('/:id', validate(updateUserSchema), UserController.updateUser);
router.delete('/:id', validate(getByIdSchema), UserController.deleteUser);
router.get('/:id', validate(getByIdSchema),UserController.getUserById);
router.post('/refresh-token', UserController.createRefreshToken);

module.exports = router;
