import {damage_type, Character} from "./character";

export class Thief extends Character{
    protected class: string;
    protected hp: number;
    protected damage: number;
    protected dmg_type: damage_type;

    constructor() {
        super();
        this.class = "Thief";
        this.hp = 100;
        this.damage = 25;
        this.dmg_type = damage_type.PHYSICAL;
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
    public gettingDamage(damage: any, hp: number, statuses: number[]): number | boolean {
        if(hp <= 0)
            return false;
        if(statuses[0] == 0)
            return hp - damage.damage;
        return false;
    }
    public revive(hp: number): number | boolean {
        if(hp <= 0)
            return this.getHp();
        return false;
    }
    public useAbility(own_statuses: number[]): number[] | boolean {
        if(own_statuses[0] != 0 || own_statuses[1] != 0)
            return false;
        own_statuses[0] = 1;
        return own_statuses;
    }
}