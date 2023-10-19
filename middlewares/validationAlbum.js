class Validations {
    validation = (schema) => async (req, res, next) => {
        const {
            description, target_id
        } = req.body;
        await schema.validate({
            description,
            target_id
        })
        next();
    }
}

module.exports = new Validations();