import {damage_type, Character} from "./character";

export class Warrior extends Character{
    protected name: string;
    protected class: string;
    protected hp: number;
    protected damage: number;
    protected defense: boolean;
    protected ability: boolean;
    constructor(name: string) {
        super();
        this.name = name;
        this.class = "Warrior";
        this.hp = 200;
        this.damage = 50;
        this.defense = false;
        this.ability = false;
    }
    public giveDamage() {
        return this.damage;
    }
    public getDamage(damage: number, dmg_type: damage_type): boolean {
        if(this.defense && dmg_type == damage_type.PHYSICAL)
            return false;
        this.hp -= damage;
        return true;
    }
    public giveDamageType(): damage_type {
        return damage_type.PHYSICAL;
    }
    public revive(): boolean {
        if(this.hp <= 0) {
            this.hp = 200;
            return true;
        }
        return false;
    }
    public useAbility(): boolean {
        if(this.ability)
            return false;

        this.ability = true;
        this.defense = true;
        return true;
    }
}