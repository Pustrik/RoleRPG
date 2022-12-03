"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warrior = void 0;
const Character_1 = require("./Character");
class Warrior extends Character_1.Character {
    constructor(name) {
        super();
        this.name = name;
        this.class = "Warrior";
        this.hp = 200;
        this.damage = 50;
        this.defense = false;
        this.ability = false;
    }
    giveDamage() {
        return this.damage;
    }
    getDamage(damage, dmg_type) {
        if (this.defense && dmg_type == Character_1.damage_type.PHYSICAL)
            return false;
        this.hp -= damage;
        return true;
    }
    giveDamageType() {
        return Character_1.damage_type.PHYSICAL;
    }
    revive() {
        if (this.hp <= 0) {
            this.hp = 200;
            return true;
        }
        return false;
    }
    useAbility() {
        if (this.ability)
            return false;
        this.ability = true;
        this.defense = true;
        return true;
    }
}
exports.Warrior = Warrior;
//# sourceMappingURL=Warrior.js.map