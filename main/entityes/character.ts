export enum damage_type {
    PHYSICAL,
    MAGICAL
}
export abstract class Character {
    protected abstract hp: number;
    protected abstract damage: number;
    protected abstract defense: boolean;
    protected abstract ability: boolean;
    public abstract giveDamage(): number;
    public abstract getDamage(damage: number, dmg_type: damage_type): boolean;
    public abstract giveDamageType(): damage_type;
    public abstract revive(): boolean;
    public abstract useAbility(): boolean;
}