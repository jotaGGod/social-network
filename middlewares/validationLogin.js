class Validations {
    validation = (schema) => async (req, res, next) => {
        const {
            email, password
        } = req.body;
        await schema.validate({
            email,
            password
        })
        next();
    }
}

module.exports = new Validations();