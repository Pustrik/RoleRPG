"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCharacter_1 = require("./CreateCharacter");
let character = CreateCharacter_1.CreateCharacter.create("name", CreateCharacter_1.char_class.WARRIOR);
console.log(character.getDamage(222, character.giveDamageType()));
console.log(character.revive());
console.log(character);
//# sourceMappingURL=index.js.map