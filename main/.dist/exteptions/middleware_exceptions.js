"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_exceptions_1 = __importDefault(require("./api_exceptions"));
function middlewareError(err, req, res, next) {
    if (err instanceof api_exceptions_1.default) {
        console.warn('error', '', {
            message: 'Error Handler',
            action: `${req.method} : ${req.url}`,
            body: Object.assign(Object.assign({}, req.body), { secretKey: undefined, publicKey: undefined }),
            err
        });
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    console.warn(err);
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
exports.default = middlewareError;
//# sourceMappingURL=middleware_exceptions.js.map