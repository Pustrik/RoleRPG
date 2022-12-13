"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create_character = exports.char_class = void 0;
const thief_1 = require("./thief");
const warrior_1 = require("./warrior");
const mage_1 = require("./mage");
let readlineSync = require('readline-sync');
var char_class;
(function (char_class) {
    char_class[char_class["WARRIOR"] = 0] = "WARRIOR";
    char_class[char_class["MAGE"] = 1] = "MAGE";
    char_class[char_class["THIEF"] = 2] = "THIEF";
})(char_class = exports.char_class || (exports.char_class = {}));
class Create_character {
    constructor() { }
    static create(name, char) {
        switch (char) {
            case char_class.WARRIOR:
                return new warrior_1.Warrior(name);
            case char_class.MAGE:
                return new mage_1.Mage(name);
            case char_class.THIEF:
                return new thief_1.Thief(name);
            default:
                return new warrior_1.Warrior(name);
        }
    }
}
exports.Create_character = Create_character;
//# sourceMappingURL=create_character.js.map