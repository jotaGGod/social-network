class Validations {
    validation = (schema) => async (req, res, next) => {
        const {
            full_name, email
        } = req.body;
        await schema.validate({
            full_name,
            email,
        })
        next();
    }
}

module.exports = new Validations();