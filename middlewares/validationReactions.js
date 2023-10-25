class Validations {
    validation = (schema) => async (req, res, next) => {
        const {
            user_id, reactions_type_id, post_id
        } = req.body;
        await schema.validate({
            user_id,
            reactions_type_id,
            post_id
        })
        next();
    }
}

module.exports = new Validations();