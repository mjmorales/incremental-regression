export type Upgrade = {
    name: string;
    modifier: number;
    count: number;
};

export const reduceUpgrades = (upgrades: Upgrade[], filter: (upgrade: Upgrade) => boolean) => {
    return upgrades.reduce((acc, upgrade) => {
        if (filter(upgrade)) {
            return acc * upgrade.modifier * upgrade.count;
        }
        return acc;
    }, 1);
}

// TickableResource provides an interface for resources that can be incremented
// over intervals of N time. It handles the logic for applying upgrades and
// calculating the effective XPS of the resource with regards to delta time.
export class TickableResource {
    name: string;
    // baseXPS is the base production rate of the resource
    private baseXPS: number;

    // positiveUpgrades and negativeUpgrades are used to modify the baseXPS
    // positiveUpgrades are any upgrades with a modifer >= 1
    private positiveUpgrades: Upgrade[] = [];
    // negativeUpgrades are any upgrades with a modifer < 1
    private negativeUpgrades: Upgrade[] = [];

    // the effective XPS is calculated by applying all upgrades to the baseXPS
    private effectiveXPS: number;

    // manualIncrementValue is the amount of resource that is produced when
    // when ignoring effectiveXPS. this should be used for click events
    // or any other user initiated change of the resource.
    public manualIncrementValue: number = 1;

    // totalProduced is the running total of the resource produced over time.
    // it consists of the sum of all effectiveXPS over time as well as any
    // manual increments. use this value when determining any scaling costs
    // or other resource costs.
    private totalProduced: number = 0;

    // capacity is the maximum amount of the resource that can be stored.
    // any production from effectiveXPS or manual increments that would
    // exceed the capacity will be ignored.
    public capacity: number = 10;

    constructor(name: string, baseXPS: number) {
        this.name = name;
        this.baseXPS = baseXPS;
        this.effectiveXPS = baseXPS;
    }

    // addUpgrade adds an upgrade to the resource and recalculates
    // the effectiveXPS
    addUpgrade(upgrade: Upgrade): void {
        if (upgrade.modifier >= 1) {
            this.positiveUpgrades.push(upgrade);
        } else {
            this.negativeUpgrades.push(upgrade);
        }

        this.calculateEffectiveXPS();
    }

    // calculateEffectiveXPS recalculates the effectiveXPS by applying
    // all upgrades to the baseXPS 
    private calculateEffectiveXPS(): void {
        const positiveModifier = reduceUpgrades(this.positiveUpgrades, () => true);
        const negativeModifier = reduceUpgrades(this.negativeUpgrades, () => true);
        this.effectiveXPS = this.baseXPS * positiveModifier * negativeModifier;
    }

    // update calculates the production of the resource over a given
    // delta time and adds it to the totalProduced.
    // this method is intended to be called at regular intervals
    // within `Ticker`.
    update(deltaTime: number): void {
        // Convert deltaTime from ms to seconds for XPS calculation
        const deltaSeconds = deltaTime / 1000;
        const production = this.effectiveXPS * deltaSeconds;
        this.increment(production);
    }

    private increment(value: number): void {
        if (value + this.totalProduced > this.capacity) {
            this.totalProduced = this.capacity;
            return;
        }

        this.totalProduced += value;
    }

    manualIncrement(value: number | null = null): void {
        if (value === null) {
            this.increment(this.manualIncrementValue);
            return;
        }

        this.increment(value);
    }

    decrement(value: number): boolean {
        if (this.totalProduced < value) {
            return false;
        }

        this.totalProduced -= value;
        return true;
    }

    getTotalProduced(): number {
        return this.totalProduced;
    }

    getEffectiveXPS(): number {
        return this.effectiveXPS;
    }

    capacityReached(): boolean {
        return this.totalProduced >= this.capacity;
    }

    // increaseXps increases the baseXPS of the resource and recalculates
    // the effectiveXPS. this should always be used when modifying the
    // baseXPS to ensure the effectiveXPS is recalculated.
    increaseXps(value: number): void {
        this.baseXPS += value;
        this.calculateEffectiveXPS();
    }
}
