const express = require('express');
const router = express.Router();
const  FileTypeController  = require('../controller/fileTypeController');
const validateSchema = require("../middlewares/fileTypeValidation");
const { createFileTypeSchema, getByIdSchema } = require("../schemas/fileTypeSchema");

router.post('/', validateSchema(createFileTypeSchema), FileTypeController.createFileType);
router.get('/', FileTypeController.getFileTypes);
router.delete('/:id', validateSchema(getByIdSchema), FileTypeController.deleteFileType);

module.exports = router;
