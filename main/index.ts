import {char_class, CreateCharacter} from "./CreateCharacter";


let character = CreateCharacter.create("name", char_class.WARRIOR);
console.log(character.getDamage(222, character.giveDamageType()));
console.log(character.revive());
console.log(character);