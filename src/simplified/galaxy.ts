import { Task } from "../stuff/tasks";
import { ProbeContainer } from "./probe";

export class GalaxyContainer {
    constructor(public readonly totalStars: number, public readonly startYear: number, private techtree: ProbeContainer) { }

    public currentYear = this.startYear;
    public probeProducingStars = 1;
    public runningProbes: Task[] = [];
    public launchedProbes = 0;
    public activeProbes = 0;

    get unexploredPlanets() { return this.totalStars - this.probeProducingStars; }

    run100Years() {
        this.currentYear += 100;
        this.runningProbes = this.runningProbes.filter(task => !task.complete(this.currentYear));

        // can't have more systems than stars!
        this.probeProducingStars = Math.min(this.totalStars, this.probeProducingStars);

        // say it takes 10 years to create a entire probe thing
        const newProbes = this.probeProducingStars * this.techtree.probesPer100Years.get();
        this.activeProbes += newProbes;
        this.launchedProbes += newProbes;
        this.runningProbes.push(
            new Task(
                "send ai probes",
                this.currentYear,
                this.currentYear + this.techtree.interstarYears.get() + this.techtree.yearsToCreateAProbeFromDiscovery.get(),
                () => {
                    this.activeProbes -= newProbes;
                    let successfulProbes = Math.floor(this.techtree.successRate.get() * newProbes);
                    if(newProbes < 10000){
                        successfulProbes = 0;
                        // run each one!
                        for(let i = 0; i <newProbes;i++){
                            if(Math.random() < this.techtree.successRate.get()){
                                successfulProbes++;
                            }
                        }
                    }
                    this.probeProducingStars += successfulProbes;
                }));
    }
}