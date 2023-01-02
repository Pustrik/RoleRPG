import {DamageType, Character} from "./character";

export class Mage extends Character{
    protected class: string;
    protected hp: number;
    protected damage: number;
    protected ability: boolean;
    protected dmgType: DamageType;
    constructor() {
        super();
        this.class = "Mage";
        this.hp = 80;
        this.damage = 100;
        this.dmgType = DamageType.MAGICAL;
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
    public useAbility(ownStatuses: number[], enemyStatuses: number[]): number[] | boolean {
        if(ownStatuses[1] != 0 || enemyStatuses[1] != 0)
            return false;
        enemyStatuses[1] = 1;
        return enemyStatuses;
    }
}