export enum DamageType {
    PHYSICAL,
    MAGICAL
}
export abstract class Character {
    protected abstract hp: number;
    protected abstract damage: number;
    public abstract getHp(): number;
    public abstract dealingDamage();
    public abstract gettingDamage(damage: any, hp: number, statuses?: number[]): number | boolean;
    public abstract revive(hp: number): number | boolean;
    public abstract useAbility(ownStatuses: number[], enemyStatuses?: number[]): number[] | boolean;
}