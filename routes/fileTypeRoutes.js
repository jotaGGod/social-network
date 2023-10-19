const express = require('express');
const router = express.Router();
const FileTypeController = require('../controller/fileTypeController');
const Validations  = require('../middlewares/validationFriendship');
const friendshipSchema = require('../validation/friendshipValidation');


router.post('/', FileTypeController.createFileType);
router.get('/', FileTypeController.getFileTypes);
router.delete('/:id', FileTypeController.deleteFileType);


module.exports = router;