import { DateSetter, Setter } from "./setter";
import { Sun } from "./stages/SolarSystem";
import { ManufacturingQueue, ResearchQueue, TelescopeQueue, ProbeQueue } from "./stuff/tasks";

export const Y_ICON = '📅';
export const R_ICON = '🧪';
export const M_ICON = '💲';
export const B_ICON = '📈';

export const Year = new DateSetter(2000);
export const Research = new Setter(0, '🧪');
export const Money = new Setter(1, '💲');
export const Budget = new Setter(.1, '📈');

setInterval(() => {
    Year.AddMonth();
    UpdateProbes(); // TODP: make this a queue too

    // TODO: could make all queues auto-update on creation...
    ManufacturingQueue.update(Year.current);
    ResearchQueue.update(Year.current);
    TelescopeQueue.update(Year.current);
    ProbeQueue.update(Year.current);

    Money.Add(Budget.current);
}, 2000);

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