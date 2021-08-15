const httpStatusCodes = require("./http-status-codes")

const NotFoundError = (req, res, next) => {
    res.status(httpStatusCodes.NOT_FOUND).send({ NOT_FOUND: 'This path is not found, please check your url' })
};

const InternalServerError = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || httpStatusCodes.INTERNAL_SERVER);
    res.send({
        code: -5,
        msg: err.message,
        records: []
    })
};

module.exports = { NotFoundError, InternalServerError }