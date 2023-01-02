import {DamageType, Character} from "./character";

export class Thief extends Character{
    protected class: string;
    protected hp: number;
    protected damage: number;
    protected dmgType: DamageType;

    constructor() {
        super();
        this.class = "Thief";
        this.hp = 100;
        this.damage = 25;
        this.dmgType = DamageType.PHYSICAL;
    }
    public getHp(): number {
        return this.hp;
    }
    public dealingDamage() {
        return {
            damage: this.damage,
            dmg_type: this.dmgType
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
    public useAbility(ownStatuses: number[]): number[] | boolean {
        if(ownStatuses[0] != 0 || ownStatuses[1] != 0)
            return false;
        ownStatuses[0] = 1;
        return ownStatuses;
    }
}