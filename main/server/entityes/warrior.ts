import {Character, DamageType} from "./character";

export class Warrior extends Character{
    protected class: string;
    protected hp: number;
    protected damage: number;
    protected ability: boolean;
    protected dmgType: DamageType;
    constructor() {
        super();
        this.class = "Warrior";
        this.hp = 200;
        this.damage = 50;
        this.ability = false;
        this.dmgType = DamageType.PHYSICAL;
    }

    public getHp(): number {
        return this.hp;
    }
    public dealingDamage() {
        return {
            damage: this.damage,
            dmgType: this.dmgType
        };
    }
    public gettingDamage(damage: any, hp: number, statuses: number[]): number | boolean {
        if(hp <= 0)
            return false;
        if(statuses[0] == 0)
            return hp - damage.damage;
        if(damage.dmgType == DamageType.MAGICAL)
            return hp - damage.damage;
        return false;
    }
    public revive(hp: number): number | boolean {
        if(hp <= 0)
            return this.getHp();
        return false;
    }
    public useAbility(ownStatuses: number[]): number[] | boolean {
        if(ownStatuses[0] != 0 || ownStatuses[1] != 0)
            return false;
        ownStatuses[0] = 1;
        return ownStatuses;
    }
}