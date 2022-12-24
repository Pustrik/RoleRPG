"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTokens = void 0;
const user_dto_1 = require("../dtos/user_dto");
const token_service_1 = require("../services/token_service");
async function userTokens(user) {
    const user_dto = (0, user_dto_1.userDto)(user);
    const tokens = (0, token_service_1.generateToken)(Object.assign({}, user_dto));
    await (0, token_service_1.saveToken)(user_dto.id, tokens.refresh_token);
    return Object.assign({ user: user_dto }, tokens);
}
exports.userTokens = userTokens;
//# sourceMappingURL=user_utill.js.map