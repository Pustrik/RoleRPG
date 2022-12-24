"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thief = void 0;
const character_1 = require("./character");
class Thief extends character_1.Character {
    constructor(name) {
        super();
        this.name = name;
        this.class = "Thief";
        this.hp = 100;
        this.damage = 25;
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
        return character_1.damage_type.PHYSICAL;
    }
    revive() {
        if (this.hp <= 0) {
            this.hp = 100;
            return true;
        }
        return false;
    }
    useAbility() {
        if (this.ability)
            return false;
        this.defense = true;
        this.ability = true;
        return true;
    }
}
exports.Thief = Thief;
//# sourceMappingURL=thief.js.map