import {Thief} from "./thief";
import {Warrior} from "./warrior";
import {Mage} from "./mage";
export enum CharClass {
    WARRIOR,
    MAGE,
    THIEF
}
export function createCharacter(char: CharClass): Warrior | Mage | Thief {
    switch (char) {
        case CharClass.WARRIOR:
            return new Warrior();
        case CharClass.MAGE:
            return new Mage();
        case CharClass.THIEF:
            return new Thief();
        default:
            return new Warrior();
    }
}