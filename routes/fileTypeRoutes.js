const express = require('express');
const router = express.Router();
const  FileTypeController  = require('../controller/fileTypeController');

router.post('/', FileTypeController.createFileType);
router.get('/', FileTypeController.getFileTypes);
router.delete('/:id', FileTypeController.deleteFileType);

module.exports = router;
