"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor() {
    }
    static userDto(model) {
        return {
            username: model.username,
            id: model.id
        };
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user_dto.js.map