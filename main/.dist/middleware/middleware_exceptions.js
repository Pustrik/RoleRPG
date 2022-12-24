"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareError = void 0;
const api_exceptions_1 = require("../exteptions/api_exceptions");
function MiddlewareError(err, req, res, next) {
    if (err instanceof api_exceptions_1.ApiError) {
        console.warn('error', '', {
            message: 'Error Handler',
            action: `${req.method} : ${req.url}`,
            body: Object.assign(Object.assign({}, req.body), { secretKey: undefined, publicKey: undefined }),
            err
        });
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
exports.MiddlewareError = MiddlewareError;
//# sourceMappingURL=middleware_exceptions.js.map