"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mage = void 0;
const character_1 = require("./character");
class Mage extends character_1.Character {
    constructor(name) {
        super();
        this.name = name;
        this.class = "Mage";
        this.hp = 80;
        this.damage = 100;
        this.defense = false;
        this.ability = false;
    }
    giveDamage() {
        return this.damage;
    }
    getDamage(damage, dmg_type) {
        if (this.defense)
            return false;
        this.hp -= damage;
        return true;
    }
    giveDamageType() {
        return character_1.damage_type.MAGICAL;
    }
    revive() {
        if (this.hp <= 0) {
            this.hp = 80;
            return true;
        }
        return false;
    }
    useAbility() {
        if (this.ability)
            return false;
        this.ability = true;
        return true;
    }
}
exports.Mage = Mage;
//# sourceMappingURL=mage.js.map