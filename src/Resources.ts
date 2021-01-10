import { DateSetter, DAY, MONTH, Setter } from "./setter";
import { Sun } from "./stages/SolarSystem";
import { TaskQueue } from "./stuff/tasks";

export const Y_ICON = '📅';
export const R_ICON = '🧪';
export const M_ICON = '💲';
export const B_ICON = '📈';

export const Year = new DateSetter(2000);
export const Research = new Setter(5, '🧪');
export const Money = new Setter(1, '💲');
export const Budget = new Setter(1.2, '📈');

export function RunYear(){
    UpdateEverything(1);
}

export function RunMonth(){
    UpdateEverything(MONTH);
}

export function RunDay(){
    UpdateEverything(DAY);
}

export function UpdateEverything(deltaYears: number){    
    Year.Add(deltaYears);
    UpdateProbes(); // TODP: make this a queue too
    TaskQueue.UpdateAll(Year.current);
    Money.Add(Budget.current * deltaYears);
}

let LastTime: number|null = null;
export function UpdateBasedOnTime(gameTime: number, perRealTimeMs: number){
    if(LastTime){
        const delta = Date.now() - LastTime;
        LastTime = Date.now();

        // so delta is some number of MS
        const deltaGameTime = gameTime * (delta / perRealTimeMs)
        UpdateEverything(deltaGameTime);
    } 
    else {
        LastTime = Date.now();
    }
    // so this is GameYears PER second
    // we are expecting... about... 30FPS, but we can just check time now vs last
}

function UpdateProbes() {
    for (const planet of Sun.planets) {
        planet.incomingProbes = planet.incomingProbes.filter(incomingProbe => {
            const hasArrived = incomingProbe.arrivalYear! <= Year.current;
            if (hasArrived) {
                // get 1 science on arrival!
                Research.Add(1);
                planet.availableProbes.push(incomingProbe);
                return false;
            }

            //still on its way
            return true;
        })
    }
}