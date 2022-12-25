import {char_class, createCharacter} from "./create_character";
import {IPlayer} from "../../interfaces/I_player";
import {Warrior} from "./warrior";
new Warrior();
export function getBasics(char: char_class): number {
    switch (char) {
        case char_class.WARRIOR:
            return createCharacter(char_class.WARRIOR).getHp();
        case char_class.MAGE:
            return createCharacter(char_class.MAGE).getHp();
        case char_class.THIEF:
            return createCharacter(char_class.THIEF).getHp();
    }
}