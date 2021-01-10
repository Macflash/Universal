import { MONTH } from "../setter";

export class Tech {
    static All: Tech[] = [];
    static Unlocked: Tech[] = [];
    static IsUnlocked(tech: Tech) {
        return !!Tech.Unlocked.find(t => t.id === tech.id)
    }
    ;

    constructor(
        public readonly id: string,
        public readonly researchCost: number,
        public readonly dependsOn: Tech[] = [],
        public readonly researchTime = 1,
    ) {
        if (!Tech.All.find(t => t.id === this.id)) {
            Tech.All.push(this);
        }
        else {
            throw "Hey! Duplicate tech!" + id;
        }
    }

    get canBuy() {
        return this.dependsOn.filter(dep => dep.unlocked).length == this.dependsOn.length;
    }

    get unlocked() {
        return Tech.IsUnlocked(this);
    }

    unlock() {
        if (this.canBuy && !this.unlocked) {
            Tech.Unlocked.push(this);
        }
    }
}

/** Builds a linear set of techs that depend on only the previous level. */
export function LinearTechLevels(name: string, levels: number): Tech[] {
    let cost = 1; // Times 10 each time for now?
    const result: Tech[] = [];
    for (let i = 1; i <= levels; i++) {
        result[i] = new Tech(
            `${name} ${i}`,
            Math.pow(10, i - 1),
            i == 1 ? [] : [result[i - 1]],
            Math.pow(10, i - 1) / 4);
    }

    return result;
}

// General Tech lines
export const Rockets = LinearTechLevels("Rockets", 7);
export const Optics = LinearTechLevels("Optics", 3);
export const Satelites = LinearTechLevels("Satellites", 3);
export const Robotics = LinearTechLevels("Robotics", 5);

// Specific techs for building
export const GroundTelescope = new Tech("Ground Telescope", 0, [Optics[1]], 6 * MONTH);
export const SpaceTelescope = new Tech("Space Telescope", 10, [GroundTelescope, Rockets[2]]);

Satelites[1].dependsOn.push(Rockets[1]);
Satelites[2].dependsOn.push(Rockets[2], Optics[1]);

export const Probes = new Tech("Probes", 1, [GroundTelescope, Rockets[1]]);
export const Lander = new Tech("Lander", 10, [Probes]);

export const InterstellarTravel = new Tech("Interstellar travel", 1000, [Rockets[5], GroundTelescope]);
