"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const index_1 = require("../index");
const LoginForm = () => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const { store } = (0, react_1.useContext)(index_1.context);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("form", { id: "form", method: "post" },
            react_1.default.createElement("input", { onChange: event => setUsername(event.target.value), name: "username", id: "username", placeholder: "username" }),
            react_1.default.createElement("input", { onChange: event => setPassword(event.target.value), name: "password", type: "password", id: "password", placeholder: "password" }),
            react_1.default.createElement("button", { id: "log", onClick: () => store.login(username, password) }, " Login"),
            react_1.default.createElement("button", { id: "reg", onClick: () => store.registration(username, password) }, "Registration"))));
};
exports.default = LoginForm;
//# sourceMappingURL=login_form.js.map