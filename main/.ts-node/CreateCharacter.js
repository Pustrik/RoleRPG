"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCharacter = exports.char_class = void 0;
const Thief_1 = require("./Thief");
const Warrior_1 = require("./Warrior");
const Mage_1 = require("./Mage");
let readlineSync = require('readline-sync');
var char_class;
(function (char_class) {
    char_class[char_class["WARRIOR"] = 0] = "WARRIOR";
    char_class[char_class["MAGE"] = 1] = "MAGE";
    char_class[char_class["THIEF"] = 2] = "THIEF";
})(char_class = exports.char_class || (exports.char_class = {}));
class CreateCharacter {
    constructor() { }
    static create(name, char) {
        switch (char) {
            case char_class.WARRIOR:
                return new Warrior_1.Warrior(name);
            case char_class.MAGE:
                return new Mage_1.Mage(name);
            case char_class.THIEF:
                return new Thief_1.Thief(name);
            default:
                return new Warrior_1.Warrior(name);
        }
    }
}
exports.CreateCharacter = CreateCharacter;
//# sourceMappingURL=CreateCharacter.js.map