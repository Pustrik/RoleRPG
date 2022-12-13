"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationGet = exports.registrationPost = exports.loginGet = exports.loginPost = void 0;
const user_validation_1 = require("../user_validation/user_validation");
require("../entityes/mage");
require("../entityes/thief");
require("../entityes/warrior");
function loginPost(req, res) {
    const is_valid = (0, user_validation_1.isValidLogin)();
    console.log(req.body);
    res.status(200).json({
        login: {
            login: req.body.login,
            password: req.body.password
        }
    });
}
exports.loginPost = loginPost;
function loginGet(req, res) {
    res.sendFile(__dirname + '/login.html');
}
exports.loginGet = loginGet;
function registrationPost(req, res) {
    const is_valid = (0, user_validation_1.isValidLogin)();
    console.log(req.body);
    res.status(200).json({
        login: {
            login: req.body.login,
            password: req.body.password
        }
    });
}
exports.registrationPost = registrationPost;
function registrationGet(req, res) {
    res.sendFile(__dirname + '/registration.html');
}
exports.registrationGet = registrationGet;
//# sourceMappingURL=auth_callbacks.js.map