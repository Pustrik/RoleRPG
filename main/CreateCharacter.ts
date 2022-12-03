import {Thief} from "./Thief";
import {Warrior} from "./Warrior";
import {Mage} from "./Mage";
let readlineSync = require('readline-sync');
export enum char_class {
    WARRIOR,
    MAGE,
    THIEF
}
export class CreateCharacter {
    private constructor() {}
    public static create(name: string, char: char_class): Warrior | Mage | Thief {
            switch (char) {
                case char_class.WARRIOR:
                    return new Warrior(name);
                case char_class.MAGE:
                    return new Mage(name);
                case char_class.THIEF:
                    return new Thief(name);
                default:
                    return new Warrior(name);
            }
        }
}