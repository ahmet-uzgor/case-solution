const DateExtension = require('@joi/date');
const JoiImport = require('joi');
const Joi = JoiImport.extend(DateExtension);
const httpStatusCodes = require('../handlers/http-status-codes');

// All request body validation rules are written below with Joi.
const validationRules = Joi.object({
    startDate: Joi.date().format('YYYY-MM-DD').utc().required(),
    endDate: Joi.date().format('YYYY-MM-DD').utc().required(),
    minCount: Joi.number().integer().min(0).required(),
    maxCount: Joi.number().integer().min(0).required()
})

module.exports = (req, res, next) => {
    const { error, value } = validationRules.validate(req.body, { convert: true }); // it converts date to utc to use in db queries
    
    if (error) { // Negative codes are indicates error, messages comes from Joi automatically
        const err = error.details[0];
        let code = -1;
        switch (err.type) {
            case 'any.empty': // İf a body parameter is empty or missing , Code is -2
            case 'any.required':
                code = -2
                break;
            case 'number.base': // İf a body parameter is entered in wrong format Code is -3
            case 'date.format':
                code = -3
                break;
        }
        console.log(err.message + " code: " + err.type);
  
        // Return bad_request error and error message
        res.status(httpStatusCodes.BAD_REQUEST).send({code, msg: err.message, records: []});
    } else {
        req.body = value
        next();
    }
}