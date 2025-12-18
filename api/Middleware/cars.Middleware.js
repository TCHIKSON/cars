const validateWithJoi = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            return {
                error: true,
                message: error.message,
                statusCode: 400
            }
        }
    }
}

module.exports = validateWithJoi;