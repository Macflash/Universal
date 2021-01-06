
export class Trait<T> {
    constructor(private researchLevels: T[]) { }
    private level = 0;

    get(): T {
        return this.researchLevels[this.level];
    }

    get isMaxed() {
        return this.level >= this.researchLevels.length - 1;
    }

    increase() {
        if (!this.isMaxed) { this.level++; }
    }
}
export class ProbeContainer {
    public yearsToCreateAProbeFromDiscovery = new Trait([1000, 500, 250, 100]);
    public probesPer100Years = new Trait([1, 2, 5, 10, 25, 50, 100, 1000]);
    public interstarYears = new Trait([10000, 5000, 1000, 150]);
    public successRate = new Trait([.05, .1, 33, .5, .7]);
    public researchSent = new Trait([1.1, 1.25, 1.5, 2, 5, 10]);
    public research = 0;
}
