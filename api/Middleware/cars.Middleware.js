
const Joi = require('joi');

const validateWithJoi = (schema) => {
    return async (req, res, next) => {
        try {
            
            await schema.validateAsync(req.body, { abortEarly: false });
            next(); 
        } catch (error) {
            
            return res.status(400).json({
                error: true,
                message: error.details.map(d => d.message).join(', '),
                statusCode: 400
            });
        }
    };
};

module.exports = {validateWithJoi};