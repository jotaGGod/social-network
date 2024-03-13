const yup = require('yup');

const createAlbumItemSchema = yup.object({
    post_id: yup.number().integer().required(),
    album_id: yup.number().integer().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});


module.exports = {
    createAlbumItemSchema,
    getByIdSchema
};
