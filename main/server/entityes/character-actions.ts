import {CharClass, createCharacter} from "./create-character";
import {Warrior} from "./warrior";
new Warrior();
export function getBasics(char: CharClass): number {
    switch (char) {
        case CharClass.WARRIOR:
            return createCharacter(CharClass.WARRIOR).getHp();
        case CharClass.MAGE:
            return createCharacter(CharClass.MAGE).getHp();
        case CharClass.THIEF:
            return createCharacter(CharClass.THIEF).getHp();
    }
}