"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    console.log("SSSSSSSs");
    // if(res.headersSent)
    //     return next(err);
    // res.status(500).send({
    //     success: false,
    //     message: err.message ? err.message : err
    // });
    console.warn(err.message);
    res.status(401).send(err.message);
    next(err);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorhandler.js.map