const yup = require('yup');
const albumSchema = yup.object({
    description: yup.string().required(),
    target_id: yup.number().integer().required()
});

module.exports =  albumSchema;
