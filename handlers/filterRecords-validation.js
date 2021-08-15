const DateExtension = require('@joi/date');
const JoiImport = require('joi');
const Joi = JoiImport.extend(DateExtension);
const httpStatusCodes = require('./http-status-codes');

// All request body validation rules are written below with Joi.
const validationRules = (minCount) => {
    return Joi.object({
        startDate: Joi.date().format('YYYY-MM-DD').utc().required(),
        endDate: Joi.date().format('YYYY-MM-DD').utc().required(), // should be a date with YYYY-MM-DD format in utc time
        minCount: Joi.number().integer().min(0).required(), // should be positive integer
        maxCount: Joi.number().integer().min(parseInt(minCount)).required() // should be integer and min as minCount parameter
    })
}

module.exports = (req, res, next) => {
    // validates all request body
    const { error, value } = validationRules(req.body.minCount).validate(req.body, { convert: true }); // it converts date to utc to use in db queries
    
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
  
        // Return bad_request error and error message
        res.status(httpStatusCodes.BAD_REQUEST).send({code, msg: err.message, records: []});
    } else { // if req. body is validated it sends to next function
        req.body = value
        next();
    }
}