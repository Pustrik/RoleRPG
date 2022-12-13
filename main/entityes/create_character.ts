import {Thief} from "./thief";
import {Warrior} from "./warrior";
import {Mage} from "./mage";
let readlineSync = require('readline-sync');
export enum char_class {
    WARRIOR,
    MAGE,
    THIEF
}
export class Create_character {
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