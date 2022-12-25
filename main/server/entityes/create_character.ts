import {Thief} from "./thief";
import {Warrior} from "./warrior";
import {Mage} from "./mage";
let readlineSync = require('readline-sync');
export enum char_class {
    WARRIOR,
    MAGE,
    THIEF
}
export function createCharacter(char: char_class): Warrior | Mage | Thief {
    switch (char) {
        case char_class.WARRIOR:
            return new Warrior();
        case char_class.MAGE:
            return new Mage();
        case char_class.THIEF:
            return new Thief();
        default:
            return new Warrior();
    }
}