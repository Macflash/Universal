import { MONTH } from "../setter";

export class Tech {
    static All: Tech[] = [];
    static Unlocked: Tech[] = [];
    static IsUnlocked(tech: Tech){
        return !!Tech.Unlocked.find(t => t.id === tech.id)
    }
;

    constructor(
        public readonly id: string,
        public readonly researchCost: number,
        public readonly dependsOn: Tech[] = [],
        public readonly researchTime = 1,
    ) { 
        if(!Tech.All.find(t => t.id === this.id)){
            Tech.All.push(this);
        }
        else {
            throw "Hey! Duplicate tech!" + id;
        }
    }

    get canBuy(){
        return this.dependsOn.filter(dep => dep.unlocked).length == this.dependsOn.length;
    }

    get unlocked(){
        return Tech.IsUnlocked(this);
    }

    unlock() {
        if(this.canBuy && !this.unlocked){
            Tech.Unlocked.push(this);
        }
    }
}

export const GroundTelescope = new Tech("Telescope", 0, [], 6 * MONTH);
export const Rocketry = new Tech("Rocketry", 5);
export const Probes = new Tech("Probes", 1, [GroundTelescope, Rocketry]);
export const Lander = new Tech("Lander", 10, [Probes]);
export const SpaceTelescope = new Tech("Space Telescope", 10, [GroundTelescope, Rocketry]);

export const InterstellarTravel = new Tech("Interstellar travel", 1000, [Rocketry, GroundTelescope]);