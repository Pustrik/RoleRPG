import {damage_type, Character} from "./character";

export class Mage extends Character{
    protected class: string;
    protected hp: number;
    protected damage: number;
    protected ability: boolean;
    protected dmg_type: damage_type;
    constructor() {
        super();
        this.class = "Mage";
        this.hp = 80;
        this.damage = 100;
        this.dmg_type = damage_type.MAGICAL;
    }

    public getHp(): number {
        return this.hp;
    }
    public dealingDamage() {
        return {
            damage: this.damage,
            dmg_type: this.dmg_type
        };
    }
    public gettingDamage(damage: any, hp: number): number | boolean {
        if(hp <= 0)
            return false;
        return hp - damage.damage;
    }
    public revive(hp: number): number | boolean {
        if(hp <= 0)
            return this.getHp();
        return false;
    }
    public useAbility(own_statuses: number[], enemy_statuses: number[]): number[] | boolean {
        if(own_statuses[1] != 0 || enemy_statuses[1] != 0)
            return false;
        enemy_statuses[1] = 1;
        return enemy_statuses;
    }
}